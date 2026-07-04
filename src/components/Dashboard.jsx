import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Dashboard = ({ dados, limites }) => {
  const data = {
    labels: dados.map(d => d.timestamp),
    datasets: [{
      label: 'Peso do Produto (g)',
      data: dados.map(d => d.peso),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  return (
    <div className="chart-container" style={{height: '300px'}}>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      <div style={{marginTop: '10px'}}>
        <p>Status da Linha: {dados.slice(-1)[0]?.falha ? "⚠️ DESVIO DETECTADO" : "✅ OPERANDO DENTRO DO PADRÃO"}</p>
      </div>
    </div>
  );
};