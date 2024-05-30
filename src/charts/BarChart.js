import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getColorsPlataforms, getDataSerie } from '../firebase/data';

const BarChart = ({serie}) => {

  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  const plataformsLocal = localStorage.getItem('plataforms') ? JSON.parse(localStorage.getItem('plataforms')) : null;
  const colorsLocal = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : null;
  const [plataforms, setPlataforms] = useState(plataformsLocal ? plataformsLocal : []);
  const [colors, setColors] = useState(colorsLocal ? colorsLocal : []);
  const [datas, setDatas] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [getDataLoaded, setGetDataLoaded] = useState(false);

  useEffect(() => {
    const readindData = async () => {
      try {
        const datasGet = await getDataSerie(serie);
        setDatas(datasGet);
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
    <div className='canva' style={{ width: '95%', height: '500px', margin: '0px auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;