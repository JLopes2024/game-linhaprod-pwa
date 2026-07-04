import { useState, useEffect } from 'react';

export const useQualityControl = () => {
  const [dados, setDados] = useState([]);
  const [limites] = useState({ superior: 55, inferior: 45, media: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      const novoPeso = 40 + Math.random() * 20; // Variação aleatória
      const falha = novoPeso > 55 || novoPeso < 45 || Math.random() > 0.95;
      
      setDados(prev => [...prev.slice(-19), { 
        peso: novoPeso.toFixed(2), 
        falha, 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return { dados, limites };
};