import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getColorsPlataforms, getSeries } from './firebase/data';

/* PÁGINA INICIAL */
import Home from './pages/Home';
import Bar from './pages/Bar';
import Sector from './pages/Sector';
import Erro404 from './pages/Erro404';

const RouterApp = () => {

    const returnPlataformsAndColors = async () => {
        var plataformsArray = [];
        var colorsArray = [];
        const plataformsGet = await getColorsPlataforms() || false;
        if (!plataformsGet) {
            plataformsArray = [
                'alunoPresente',
                'alura',
                'khanAcademy',
                'leiaSP',
                'redacaoSP',
                'tarefaSP',
                'matific',
            ];
            colorsArray =  [
                "#FF5733", // Vermelho alaranjado
                "#33FF57", // Verde limão
                "#3357FF", // Azul
                "#F333FF", // Rosa
                "#FF33A1", // Rosa escuro
                "#33FFF3", // Verde água
                "#FFF333"  // Amarelo
            ];   
        } else {
            Object.keys(plataformsGet).map((value, index) => {
                const plataform = value || 'plataform';
                const color = plataformsGet[plataform] || '#fff';
                plataformsArray.push(plataform);
                colorsArray.push(color);
            });
        }
        return { plataformsArray, colorsArray };
    }
  
    const seriesLocal = localStorage.getItem('series') ? JSON.parse(localStorage.getItem('plataforms')) : null;
    const plataformsLocal = localStorage.getItem('plataforms') ? JSON.parse(localStorage.getItem('plataforms')) : false;
    const colorsLocal = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : false;
    
    useEffect(() => {
        const getData = async () => {
            try {
                const { plataformsArray, colorsArray } = await returnPlataformsAndColors();
                const seriesArray = await getSeries();
                if (!seriesArray) {
                    return;
                }
                await localStorage.setItem('plataforms', JSON.stringify(plataformsArray));
                await localStorage.setItem('colors', JSON.stringify(colorsArray));
                await localStorage.setItem('series', JSON.stringify(seriesArray));
                window.location.reload();
            } catch (error) {
                console.log(error);
                return false;
            }
            return true;
        };

        if (!plataformsLocal || !colorsLocal || !seriesLocal) {
            getData();
        }
    }, []);

    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/sector" element={<Sector />} />
            <Route path="/*" element={<Erro404 />} />
            </Routes>
        </Router>
    );

}

export default RouterApp;