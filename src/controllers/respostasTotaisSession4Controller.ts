import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Função para converter horas e minutos em minutos totais
let converterParaMinutos = (tempo: string): number => {
    const [horas, minutos] = tempo.split(':').map(Number); // Divide a string e converte para números
    return (horas * 60) + minutos; // Converte horas para minutos e soma com os minutos
};

// Função para extrair o número da string na questão Q4C
let extrairNumero = (resposta: string): number | null => {
    const partes = resposta.split(',');
    const numeroStr = partes[0].trim(); // Obtém a parte numérica
    const numero = Number(numeroStr);
    return isNaN(numero) ? null : numero; // Retorna null se não for um número
};

let PegandoQuestoes = (fk_Questao_id_questao: number, respostas_abertas: any, usuarioRespostas: any) => {
    if (fk_Questao_id_questao === 20) {
        usuarioRespostas.Q4A = respostas_abertas; // Caminhada no Lazer
    } else if (fk_Questao_id_questao === 21) {
        usuarioRespostas.Q4B = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 22) {
        const numero = extrairNumero(respostas_abertas); // Extrai o número
        usuarioRespostas.Q4C = numero !== null ? numero : 0; // Define como 0 se não for um número
    } else if (fk_Questao_id_questao === 23) {
        usuarioRespostas.Q4D = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 24) {
        usuarioRespostas.Q4E = respostas_abertas; // Caminhada no Lazer
    } else if (fk_Questao_id_questao === 25) {
        usuarioRespostas.Q4F = converterParaMinutos(respostas_abertas);
    }
};

// Função que calcula a caminhada leve
let TotalCaminhadaLeveLazer = (Q4A: number, Q4B: number): number => {
    return Q4A * Q4B;
};

// Função que calcula a caminhada moderada
let TotalCaminhadaModeradaLazer = (Q4C: number, Q4D: number): number => {
    return Q4C * Q4D;
};

// Função que calcula a caminhada vigorosa
let TotalCaminhadaVigorosaLazer = (Q4E: number, Q4F: number): number => {
    return Q4E * Q4F;
};

export const resp_total_caminhada_leve_Lazer = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q4A: 0, Q4B: 0, Q4C: 0, Q4D: 0, Q4E: 0, Q4F: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_leve_Lazer = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaLeveLazer(user.Q4A, user.Q4B), // Total de caminhada leve
            };
        });
        
        console.log('Resposta Total Caminhada Leve Lazer:', resp_total_caminhada_leve_Lazer);
        return reply.send(resp_total_caminhada_leve_Lazer);
    } catch (error) {
        console.error('Erro no cálculo do total leve!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

export const resp_total_caminhada_moderada_Lazer = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q4A: 0, Q4B: 0, Q4C: 0, Q4D: 0, Q4E: 0, Q4F: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_moderada_Lazer = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaModeradaLazer(user.Q4C, user.Q4D), // Total de caminhada moderada
            };
        });
        
        console.log('Resposta Total Caminhada Moderada Lazer:', resp_total_caminhada_moderada_Lazer);
        return reply.send(resp_total_caminhada_moderada_Lazer);
    } catch (error) {
        console.error('Erro no cálculo do total moderado!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

export const resp_total_caminhada_vigorosa_Lazer = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q4A: 0, Q4B: 0, Q4C: 0, Q4D: 0, Q4E: 0, Q4F: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_vigorosa_Lazer = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaVigorosaLazer(user.Q4E, user.Q4F), // Total de caminhada vigorosa
            };
        });
        
        console.log('Resposta Total Caminhada Vigorosa Lazer:', resp_total_caminhada_vigorosa_Lazer);
        return reply.send(resp_total_caminhada_vigorosa_Lazer);
    } catch (error) {
        console.error('Erro no cálculo do total vigoroso (lazer)!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};
