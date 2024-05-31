import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { getColorsPlataforms, getDataSerie } from '../firebase/data';

const PieChart = ({ ensino }) => {
  const ensinoText = ensino === 'medio' ? 'Ensino Médio' : 'Ensino Fundamental';
  const seriesLocal = localStorage.getItem('series') ? JSON.parse(localStorage.getItem('series')) : [];
  const colorsLocal = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : null;
  const [series, setSeries] = useState([]);
  const [colors, setColors] = useState(colorsLocal ? colorsLocal : []);
  const [datas, setDatas] = useState(Array.from({ length: series.length }, (_, i) => i + 1 * 2));
  const [dataLoaded, setDataLoaded] = useState(false);
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  var plataformsExists = [
    'alunoPresente',
    'alura',
    'khanAcademy',
    'leiaSP',
    'redacaoSP',
    'tarefaSP',
    'matific',
  ];

  const consultarDadosDaSerie = async (seriesList) => {
    var dados = {};
    var datasList = [];
    try {
      const resposta = await Promise.all(seriesList.map( async (serie) => {
        const objSerie = await getDataSerie(serie); // Retorna um { OBJETO }
        dados[serie] = objSerie;
      }));

      if (resposta) {
        await Object.keys(dados).map((serie) => {
          let soma = 0;
          const objSerie = dados[serie];
          Object.values(objSerie).map((val) => {
            soma += val;
          })
          const media = soma / Object.values(objSerie).length;
          datasList.push(media);
        });
        setDatas(datasList)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verficarSeriesPeloEnsino = async () => {
    var seriesList = [];
    try {
      if (ensino === 'medio') {
        seriesLocal.map((serie) => {
          if (serie.includes('1') || serie.includes('2') || serie.includes('3')) {
            seriesList.push(serie);
          }
        });
      } else if (ensino === 'fundamental') {
        seriesLocal.map((serie) => {
          if (serie.includes('6') || serie.includes('7') || serie.includes('8') || serie.includes('9')) {
            seriesList.push(serie);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    setSeries(seriesList);
    setDatas(Array.from({ length: seriesList.length }, (_, i) => i + 1 * 2));
    const dados = await consultarDadosDaSerie(seriesList);
  }


  useEffect(() => {
    verficarSeriesPeloEnsino();
    const ctx = chartRef.current.getContext('2d');
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }
    myChartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: series,
        datasets: [{
          label: ensinoText,
          data: datas,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [ensino]);

  return (
    <div className='canva' style={{ width: '90%', height: '400px', margin: '0 auto' }}>
      <Doughnut data={{ labels: series, datasets: [{ label: ensinoText, data: datas, backgroundColor: colors, borderColor: colors, borderWidth: 1 }] }} options={{ plugins: { tooltip: { enabled: true }, legend: { display: true } } }} />
      <canvas ref={chartRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default PieChart;
