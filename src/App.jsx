import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const chartRefs = useRef([]);
  const audioCtx = useRef(null);
  
  const getInitialState = () => [
    { id: 'peso', label: 'Peso', unit: 'g', valor: 50, min: 48, max: 52, cor: '#00ffcc', input: '', log: Array(20).fill(50), falhas: 0 },
    { id: 'temp', label: 'Temp. Fritura', unit: '°C', valor: 175, min: 170, max: 180, cor: '#00ffcc', log: Array(20).fill(175), falhas: 0, input: '' },
    { id: 'o2', label: 'O2 Residual', unit: '%', valor: 1.5, min: 0.5, max: 2.5, cor: '#00ffcc', log: Array(20).fill(1.5), falhas: 0, input: '' },
    { id: 'velo', label: 'Velocidade', unit: 'ppm', valor: 120, min: 110, max: 130, cor: '#00ffcc', log: Array(20).fill(120), falhas: 0, input: '' }
  ];

  const [indicadores, setIndicadores] = useState(getInitialState());
  const [sinal, setSinal] = useState(null);
  const [tempo, setTempo] = useState(1800);

  const playAlarme = () => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.current.createOscillator();
    osc.connect(audioCtx.current.destination);
    osc.frequency.value = 440;
    osc.start(); osc.stop(audioCtx.current.currentTime + 0.5);
  };

  useEffect(() => {
    const timer = setInterval(() => setTempo(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let algumaFalha = false;
      setIndicadores(prev => prev.map(ind => {
        const variacao = (Math.random() - 0.5) * (ind.max - ind.min) * 1.2;
        const novoValor = ind.valor + variacao;
        const falha = novoValor > ind.max || novoValor < ind.min;
        if (falha) algumaFalha = true;
        return { 
          ...ind, 
          valor: novoValor, 
          falhas: falha ? ind.falhas + 1 : ind.falhas, 
          log: [...ind.log.slice(1), novoValor.toFixed(1)] 
        };
      }));
      if (algumaFalha) playAlarme();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const aplicarCorrecao = (id) => {
    if (!sinal) return alert("Selecione o sinal (+ ou -)!");
    setIndicadores(p => p.map(i => {
      if (i.id === id && i.input) {
        const val = parseFloat(i.input);
        return { ...i, valor: i.valor + (sinal === '+' ? val : -val), input: '' };
      }
      return i;
    }));
    setSinal(null);
  };

  const baixarGrafico = (i) => {
    const link = document.createElement("a");
    link.href = chartRefs.current[i].toBase64Image();
    link.download = `${indicadores[i].label}.png`;
    link.click();
  };

  return (
    <div className="ihm-container">
      <header className="header-bar">
        <span>PRODUÇÃO SALGADINHOS</span>
        <span>  {Math.floor(tempo / 60).toString().padStart(2, '0')}:{ (tempo % 60).toString().padStart(2, '0') }</span>
        <span>FALHAS: {indicadores.reduce((a, b) => a + b.falhas, 0)}</span>
        <button onClick={() => window.location.reload()}>REINICIAR</button>
      </header>

      <div className="dashboard-grid">
        {indicadores.map((ind, i) => (
          <div key={ind.id} className={`card-indicador ${ind.valor > ind.max || ind.valor < ind.min ? 'card-falha' : ''}`}>
            <h4>{ind.label}</h4>
            
            <div className="valor-display" style={{fontSize: '1.4rem', margin: '10px 0'}}>
              {ind.valor.toFixed(1)} <small>{ind.unit}</small>
            </div>

            <div style={{ height: '80px', marginBottom: '15px' }}>
              <Line ref={el => chartRefs.current[i] = el} data={{ labels: Array(20).fill(''), datasets: [{ data: ind.log, borderColor: ind.cor, borderWidth: 2, pointRadius: 0 }] }} options={{ maintainAspectRatio: false, animation: { duration: 0 }, scales: { y: { min: ind.min - 5, max: ind.max + 5 } }, plugins: { legend: { display: false } } }} />
            </div>
            
            <div className="input-group">
              <input className="input-field" type="number" placeholder="Valor" value={ind.input} onChange={(e) => setIndicadores(p => p.map(x => x.id === ind.id ? {...x, input: e.target.value} : x))} />
              <div className="arrow-controls">
                <button onClick={() => setSinal('+')} className={sinal === '+' ? 'active' : ''}>▲</button>
                <button onClick={() => setSinal('-')} className={sinal === '-' ? 'active' : ''}>▼</button>
              </div>
              <button className="btn-ok" onClick={() => aplicarCorrecao(ind.id)}>OK</button>
              <button className="btn-sinal" onClick={() => baixarGrafico(i)}>⬇</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="normas-footer">
        <h3>📋 MARGENS TÉCNICAS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {indicadores.map(i => <div key={i.id}>• {i.label}: {i.min}-{i.max}{i.unit}</div>)}
        </div>
      </footer>
    </div>
  );
}

export default App;