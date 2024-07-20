import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../db/connection';

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ message: 'Rota GET /Usuario funcionando' });
};

export const createUser = async (request: FastifyRequest<{ Body: { name: string; type: string; locality?: string } }>, reply: FastifyReply) => {
  try {
    console.log('Recebendo dados do frontend:', request.body);

    const { name, type, locality = 'Desconhecida' } = request.body;

    console.log(`Nome: ${name}, Tipo: ${type}, Localidade: ${locality}`);
    console.log('Tentando inserir usuário no banco de dados...');

    await db('Usuario').insert({ nome: name, tipo: type, localidade: locality });

    console.log('Usuário inserido com sucesso');
    return reply.send({ message: 'Usuário inserido com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    return reply.status(500).send('Erro ao inserir usuário');
  }
};
