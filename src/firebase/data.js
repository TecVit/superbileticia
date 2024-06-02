import firebase from 'firebase/compat/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

var plataformsExists = [
    'alunoPresente',
    'alura',
    'khanAcademy',
    'leiaSP',
    'redacaoSP',
    'tarefaSP',
    'matific',
];

var minhaTurma = {
    alura: 7.5,
    redacaoSP: 45,
    alunoPresente: 89,
    khanAcademy: 74,
    leiaSP: 2.7,
    tarefaSP: 57,    
}


const getColorsPlataforms = async () => {
    const cores = {};
    try {
        const colorsRef = await db.collection('plataformas').doc('cores').get();
        if (colorsRef.exists) {
            const data = colorsRef.data();
            plataformsExists.forEach((plataforma) => {
                if (data[plataforma]) {
                    cores[plataforma] = data[plataforma];
                }
            });
        } else {
            console.log('Documento não encontrado!');
        }
    } catch (error) {
        console.log('Erro ao buscar cores:', error);
        return false;
    }
    return cores;
}

const getDataSerie = async (serie) => {
    const datas = {};
    try {
        const dataRef = await db.collection('series').doc(serie).get();
        if (dataRef.exists) {
            const data = dataRef.data();
            plataformsExists.forEach((plataforma) => {
                if (data[plataforma]) {
                    datas[plataforma] = data[plataforma];
                }
            });
        } else {
            console.log('Documento não encontrado!');
        }
    } catch (error) {
        console.log('Erro ao buscar cores:', error);
        return false;
    }
    return datas;
}

const getSeries = async () => {
    const series = [];
    try {
        const seriesRef = await db.collection('series').get();
        if (seriesRef.size > 0) {
            seriesRef.docs.map((val) => {
                const serie = val.id;
                series.push(serie);
            })
        } else {
            console.log('Documento não encontrado!');
            return false;
        }
    } catch (error) {
        console.log('Erro ao buscar cores:', error);
        return false;
    }
    return series;
}

export { getColorsPlataforms, getDataSerie, getSeries }