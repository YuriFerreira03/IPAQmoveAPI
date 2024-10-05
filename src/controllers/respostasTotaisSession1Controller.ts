import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Função para converter horas e minutos em minutos totais
let converterParaMinutos = (tempo: string): number => {
    const [horas, minutos] = tempo.split(':').map(Number); // Divide a string e converte para números
    return (horas * 60) + minutos; // Converte horas para minutos e soma com os minutos
};

let PegandoQuestoes = (fk_Questao_id_questao: number, respostas_abertas: any, usuarioRespostas: any) => {
    if (fk_Questao_id_questao === 2) {
        usuarioRespostas.Q1B = respostas_abertas; // Caminhada no trabalho
    } else if (fk_Questao_id_questao === 3) {
        usuarioRespostas.Q1C = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 4) {
        usuarioRespostas.Q1D = respostas_abertas; // Caminhada no trabalho
    } else if (fk_Questao_id_questao === 5) {
        usuarioRespostas.Q1E = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 6) {
        usuarioRespostas.Q1F = respostas_abertas; // Caminhada no trabalho
    } else if (fk_Questao_id_questao === 7) {
        usuarioRespostas.Q1G = converterParaMinutos(respostas_abertas);
    }
};

// Função que calcula a caminhada leve
let TotalCaminhadaLeveTrabalho = (q1b: number, q1c: number): number => {
    return q1b * q1c;
};

// Função que calcula a caminhada moderada
let TotalCaminhadaModeradaTrabalho = (q1d: number, q1e: number): number => {
    return q1d * q1e;
};

// Função que calcula a caminhada vigorosa
let TotalCaminhadaVigorosaTrabalho = (q1f: number, q1g: number): number => {
    return q1f * q1g;
};

export const resp_total_caminhada_leve_trabalho = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q1B: 0, Q1C: 0, Q1D: 0, Q1E: 0, Q1F: 0, Q1G: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_leve_trabalho = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaLeveTrabalho(user.Q1B, user.Q1C), // Total de caminhada leve
            };
        });
        
        console.log('Resposta Total Caminhada Leve Trabalho:', resp_total_caminhada_leve_trabalho);
        return reply.send(resp_total_caminhada_leve_trabalho);
    } catch (error) {
        console.error('Erro no cálculo do total leve!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

export const resp_total_caminhada_moderada_trabalho = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q1B: 0, Q1C: 0, Q1D: 0, Q1E: 0, Q1F: 0, Q1G: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_moderada_trabalho = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaModeradaTrabalho(user.Q1D, user.Q1E), // Total de caminhada moderada
            };
        });
        
        console.log('Resposta Total Caminhada Moderada Trabalho:', resp_total_caminhada_moderada_trabalho);
        return reply.send(resp_total_caminhada_moderada_trabalho);
    } catch (error) {
        console.error('Erro no cálculo do total moderado!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

export const resp_total_caminhada_vigorosa_trabalho = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q1B: 0, Q1C: 0, Q1D: 0, Q1E: 0, Q1F: 0, Q1G: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_vigorosa_trabalho = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaVigorosaTrabalho(user.Q1F, user.Q1G), // Total de caminhada vigorosa
            };
        });
        
        console.log('Resposta Total Caminhada Vigorosa Trabalho:', resp_total_caminhada_vigorosa_trabalho);
        return reply.send(resp_total_caminhada_vigorosa_trabalho);
    } catch (error) {
        console.error('Erro no cálculo do total vigoroso!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};
