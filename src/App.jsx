import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  // Configuração dos 4 pilares da produção de salgadinhos
  const [indicadores, setIndicadores] = useState([
    { id: 'peso', label: 'Peso (g)', unit: 'g', valor: 50, setpoint: 50, min: 48, max: 52, cor: '#f59e0b', input: '', log: [], falhas: 0 },
    { id: 'temp', label: 'Temp. Fritura', unit: '°C', valor: 175, setpoint: 175, min: 170, max: 180, cor: '#ef4444', input: '', log: [], falhas: 0 },
    { id: 'o2', label: 'O2 Residual', unit: '%', valor: 1.5, setpoint: 1.5, min: 0.5, max: 2.5, cor: '#3b82f6', input: '', log: [], falhas: 0 },
    { id: 'velo', label: 'Velocidade', unit: 'ppm', valor: 120, setpoint: 120, min: 110, max: 130, cor: '#22c55e', input: '', log: [], falhas: 0 }
  ]);
  
  const [tempo, setTempo] = useState(1800);
  const audioCtx = useRef(null);

  // Função para tocar alarme sonoro
  const playAlarme = () => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.current.createOscillator();
    osc.connect(audioCtx.current.destination);
    osc.frequency.value = 440;
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.5);
  };

  useEffect(() => {
    const timer = setInterval(() => setTempo(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  // Motor da Linha: Simulação aleatória a cada 30 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      let algumaFalha = false;
      setIndicadores(prev => prev.map(ind => {
        const variacao = (Math.random() - 0.5) * (ind.max - ind.min) * 0.4;
        const novoValor = ind.valor + variacao;
        const estaEmFalha = novoValor > ind.max || novoValor < ind.min;
        if (estaEmFalha) algumaFalha = true;
        
        return { 
          ...ind, 
          valor: novoValor, 
          falhas: estaEmFalha ? ind.falhas + 1 : ind.falhas,
          log: [...ind.log.slice(-19), novoValor.toFixed(1)] 
        };
      }));
      if (algumaFalha) playAlarme();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const aplicarCorrecao = (id) => {
    setIndicadores(prev => prev.map(ind => {
      if (ind.id === id && ind.input !== '') {
        const novoValor = ind.valor + parseFloat(ind.input);
        return { ...ind, valor: novoValor, input: '', log: [...ind.log.slice(-19), novoValor.toFixed(1)] };
      }
      return ind;
    }));
  };

  return (
    <div className="ihm-container">
      <header className="header-bar">
        PRODUÇÃO DE SALGADINHOS | TEMPO: {Math.floor(tempo/60)}:{(tempo%60).toString().padStart(2, '0')} | FALHAS: {indicadores.reduce((acc, i) => acc + i.falhas, 0)}
      </header>

      <div className="dashboard-grid">
        {indicadores.map(ind => (
          <div key={ind.id} className={`card-indicador ${ind.valor > ind.max || ind.valor < ind.min ? 'card-falha' : ''}`}>
            <h3>{ind.label} (Set: {ind.setpoint}{ind.unit})</h3>
            <div style={{ height: '100px' }}>
              <Line data={{ labels: Array(20).fill(''), datasets: [{ label: ind.label, data: ind.log, borderColor: ind.cor }] }} options={{ maintainAspectRatio: false }} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '0.9rem' }}>Atual: {ind.valor.toFixed(1)}{ind.unit}</span>
              <input type="number" placeholder="Off" value={ind.input} onChange={(e) => setIndicadores(p => p.map(i => i.id === ind.id ? {...i, input: e.target.value} : i))} />
              <button onClick={() => aplicarCorrecao(ind.id)}>OK</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="normas-footer">
        <h3>📋 MARGENS TÉCNICAS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {indicadores.map(i => <div key={i.id}>• {i.label}: <b>{i.min}-{i.max} {i.unit}</b></div>)}
        </div>
      </footer>
    </div>
  );
}

export default App;