import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Dashboard = ({ dados }) => {
  const ultimoDado = dados[dados.length - 1] || {};
  
  const data = {
    labels: dados.map(d => d.timestamp),
    datasets: [{
      label: 'Medição Atual',
      data: dados.map(d => d.peso),
      borderColor: ultimoDado.falha ? '#ff0000' : '#00ffcc',
      tension: 0.3
    }]
  };

  return (
    <div className="card-indicador">
      <h4>MONITORAMENTO EM TEMPO REAL</h4>
      <div style={{ height: '200px' }}>
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false, animation: false }} />
      </div>
      <div className={`status-bar ${ultimoDado.falha ? 'alerta-pulsante' : ''}`}>
        {ultimoDado.falha ? "⚠️ ATENÇÃO: DESVIO DETECTADO" : "✅ SISTEMA OPERANDO"}
      </div>
    </div>
  );
};