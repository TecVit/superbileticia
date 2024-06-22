import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getColorsPlataforms, getDataSerie, setRankingEnsino } from '../firebase/data';

const BarChart = (props) => {
  const { serie, ensino } = props;
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  const plataformsLocal = localStorage.getItem('plataforms') ? JSON.parse(localStorage.getItem('plataforms')) : null;
  const colorsLocal = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : null;
  const [plataforms, setPlataforms] = useState([]);
  /*const plataformsText = [
    'Aluno Presente',
    'Alura',
    'Khan Academy',
    'Leia SP',
    'Redação SP',
    'Tarefas SP',
    'Matific',
  ];*/
  const [colors, setColors] = useState(colorsLocal ? colorsLocal : []);
  const [datas, setDatas] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [getDataLoaded, setGetDataLoaded] = useState(false);
  
  useEffect(() => {
    const readindData = async () => {
      try {
        const { datasGet, plataformsGet } = await getDataSerie(serie);
        setDatas(datasGet);
        setPlataforms(plataformsGet);
        setGetDataLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    readindData();
  }, [getDataLoaded, serie])

  useEffect(() => {
    if (!getDataLoaded) return;

    const ctx = chartRef.current.getContext('2d');
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }
    myChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: plataforms,
        datasets: [{
          label: serie,
          data: datas,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: '#888',
            },
            ticks: {
              color: '#888',
            }
          },
          x: {
            grid: {
              color: '#888',
            },
            ticks: {
              color: '#888',
            }
          }
        },
      }
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [getDataLoaded, serie]);

  return (
    <div className='canva'>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;