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
    var seriesOrdenadas = {};
    var datasList = [];
    var seriesText = [];
    try {
      const resposta = await Promise.all(seriesList.map( async (serie) => {
        const { datasGet, plataformsGet } = await getDataSerie(serie); // Retorna um { OBJETO }
        dados[serie] = await datasGet;
        return true;
      }));

      if (resposta) {
        await Promise.all(Object.keys(dados).map( async (serie) => {
          let soma = 0;
          const  datasGet = dados[serie];
          Object.values(datasGet).map((val) => {
            soma += Number(val);
          })
          const media = (soma / Object.values(datasGet).length);
          seriesOrdenadas[serie] = media;
          datasList.push(media);
        }));

        await datasList.sort();
        
        let arraySeriesOrdenadasDescrecente = await Object.entries(seriesOrdenadas);
        await localStorage.setItem('ranking', JSON.stringify(arraySeriesOrdenadasDescrecente));
        await arraySeriesOrdenadasDescrecente.sort((a, b) => b[1] - a[1]);
        
        let seriesOrdenadasDescrecente = await Object.fromEntries(arraySeriesOrdenadasDescrecente);

        await Object.keys(seriesOrdenadasDescrecente).map( async (serie) => {
          const valorSerie = seriesOrdenadas[serie]; 
          if (valorSerie === datasList[datasList.length - 1]) {
            localStorage.setItem('vencedor', serie);
          }
          seriesText.push(serie);
        });

        await seriesText.reverse();

        setSeries(seriesText);
        setDatas(datasList);
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
