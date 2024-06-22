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

const plataformsText = [
    'Aluno Presente',
    'Alura',
    'Khan Academy',
    'Leia SP',
    'Redação SP',
    'Tarefas SP',
    'Matific',
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

const getLastUpdate = async () => {
    try {
        const dataRef = await db.collection('dados').doc('atualizacao').get();
        if (dataRef.exists) {
            const data = dataRef.data();
            return `${data.inicio} - ${data.fim}`;
        } else {
            console.log('Documento não encontrado!');
        }
    } catch (error) {
        console.log('Erro ao buscar cores:', error);
        return false;
    }
}

const getDataSerie = async (serie) => {
    const datasGet = {};
    const plataformsGet = [];
    try {
        const dataRef = await db.collection('series').doc(serie).get();
        if (dataRef.exists) {
            const data = dataRef.data();
            plataformsExists.forEach((plataforma, index) => {
                if (data[plataforma]) {
                    const vencedor = data.vencedor;
                    if (vencedor) {
                        localStorage.setItem('vencedor', serie);
                    }
                    datasGet[plataformsText[index]] = data[plataforma];
                    plataformsGet.push(plataformsText[index]);
                }
            });
        } else {
            console.log('Documento não encontrado!');
        }
    } catch (error) {
        console.log('Erro ao buscar cores:', error);
        return false;
    }
    return { datasGet, plataformsGet };
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

export { getColorsPlataforms, getDataSerie, getSeries, getLastUpdate }