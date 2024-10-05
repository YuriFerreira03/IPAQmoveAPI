import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

let converterParaMinutos = (tempo: string): number => {
    const [horas, minutos] = tempo.split(':').map(Number); // Divide a string e converte para números
    return (horas * 60) + minutos; // Converte horas para minutos e soma com os minutos
};

let PegandoQuestoes = (fk_Questao_id_questao: number, respostas_abertas: any, usuarioRespostas: any) => {
    if (fk_Questao_id_questao === 10) {
        usuarioRespostas.Q2C = respostas_abertas; 
    } else if (fk_Questao_id_questao === 11) {
        usuarioRespostas.Q2D = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 12) {
        usuarioRespostas.Q2E = respostas_abertas;
    } else if (fk_Questao_id_questao === 13) {
        usuarioRespostas.Q2F = converterParaMinutos(respostas_abertas);
    }
};

// Função que calcula a caminhada leve
let TotalCaminhadaLeveTransporte = (q2e: number, q2f: number): number => {
    return q2e * q2f;
};

// Função que calcula a caminhada moderada
let TotalCaminhadaModeradaTransporte = (q2c: number, q2d: number): number => {
    return q2c * q2d;
};

export const resp_total_caminhada_leve_transporte = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q2C: 0, Q2D: 0, Q2E: 0, Q2F: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_leve_transporte = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaLeveTransporte(user.Q2E, user.Q2F), // Total de caminhada leve
            };
        });
        
        console.log('Resposta Total Caminhada Leve Transporte:', resp_total_caminhada_leve_transporte);
        return reply.send(resp_total_caminhada_leve_transporte);
    } catch (error) {
        console.error('Erro no cálculo do total leve (transporte)!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

export const resp_total_caminhada_moderada_transporte = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                usuarios[resposta.fk_Usuario_id_usuario] = { Q2C: 0, Q2D: 0, Q2E: 0, Q2F: 0 };
            }
            PegandoQuestoes(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_caminhada_moderada_transporte = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCaminhada: TotalCaminhadaModeradaTransporte(user.Q2C, user.Q2D), // Total de caminhada moderada
            };
        });
        
        console.log('Resposta Total Caminhada Moderada Transporte:', resp_total_caminhada_moderada_transporte);
        return reply.send(resp_total_caminhada_moderada_transporte);
    } catch (error) {
        console.error('Erro no cálculo do total moderado (transporte)!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};
