import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Função para converter uma string de tempo (hh:mm) em minutos
let converterParaMinutos = (tempo: string): number => {
    const partes = tempo.split(':');
    if (partes.length !== 2) { // Verifica se o formato é hh:mm
        throw new Error('Formato de tempo inválido');
    }
    const [horas, minutos] = partes.map(Number);
    return (horas * 60) + minutos;
};

// Função para pegar respostas e armazenar nas propriedades corretas de 'usuarioRespostas'
let atualizarRespostasUsuario = (fk_Questao_id_questao: number, respostas_abertas: any, usuarioRespostas: any) => {
    if (fk_Questao_id_questao === 14) {
        usuarioRespostas.Q3A = respostas_abertas;
    } else if (fk_Questao_id_questao === 15) {
        usuarioRespostas.Q3B = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 16) {
        usuarioRespostas.Q3C = respostas_abertas;
    } else if (fk_Questao_id_questao === 17) {
        usuarioRespostas.Q3D = converterParaMinutos(respostas_abertas);
    } else if (fk_Questao_id_questao === 18) {
        usuarioRespostas.Q3E = respostas_abertas;
    } else if (fk_Questao_id_questao === 19) {
        usuarioRespostas.Q3F = converterParaMinutos(respostas_abertas);
    }
};

// Função para calcular o total moderado (caminhada leve)
let TotalModeradaCasa = (Q3A: number, Q3B: number, Q3C: number, Q3D: number): number => {
    return ((Q3A * Q3B) + (Q3C * Q3D));
};

// Função para calcular o total vigoroso (caminhada moderada)
let TotalVigorosaCasa = (Q3E: number, Q3F: number): number => {
    return Q3E * Q3F;
};

// Endpoint para calcular o total moderado (caminhada leve) por usuário
export const resp_total_moderado_casa = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                // Inicializando com todos os campos necessários
                usuarios[resposta.fk_Usuario_id_usuario] = { Q3A: 0, Q3B: 0, Q3C: 0, Q3D: 0, Q3E: 0, Q3F: 0 };
            }
            // Atualizar as respostas de cada usuário
            atualizarRespostasUsuario(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_moderado_casa = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCasa: TotalModeradaCasa(user.Q3A, user.Q3B, user.Q3C, user.Q3D), // Total de caminhada leve
            };
        });
        
        console.log('Resposta Total Moderado Casa:', resp_total_moderado_casa);
        return reply.send(resp_total_moderado_casa);
    } catch (error) {
        console.error('Erro no cálculo do total moderado (casa)!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};

// Endpoint para calcular o total vigoroso (caminhada moderada) por usuário
export const resp_total_vigoroso_casa = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const respostas = await db('Responde').select('fk_Usuario_id_usuario', 'fk_Questao_id_questao', 'respostas_abertas');
        
        // Armazenar respostas por usuário
        const usuarios: { [id: number]: any } = {};
        
        respostas.forEach((resposta: any) => {
            if (!usuarios[resposta.fk_Usuario_id_usuario]) {
                // Inicializando com todos os campos necessários
                usuarios[resposta.fk_Usuario_id_usuario] = { Q3A: 0, Q3B: 0, Q3C: 0, Q3D: 0, Q3E: 0, Q3F: 0 };
            }
            // Atualizar as respostas de cada usuário
            atualizarRespostasUsuario(resposta.fk_Questao_id_questao, resposta.respostas_abertas, usuarios[resposta.fk_Usuario_id_usuario]);
        });
        
        // Calcular total para cada usuário
        const resp_total_vigoroso_casa = Object.keys(usuarios).map((id) => {
            const user = usuarios[Number(id)];
            return {
                id: Number(id),
                totalCasa: TotalVigorosaCasa(user.Q3E, user.Q3F), // Total de caminhada moderada
            };
        });
        
        console.log('Resposta Total Vigoroso Casa:', resp_total_vigoroso_casa);
        return reply.send(resp_total_vigoroso_casa);
    } catch (error) {
        console.error('Erro no cálculo do total vigoroso (casa)!', error);
        return reply.status(500).send({ message: 'Erro ao buscar dados!' });
    }
};
