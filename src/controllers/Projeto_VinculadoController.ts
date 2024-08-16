import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../db/connection';

export const VincularProjeto = async (
  request: FastifyRequest<{ 
    Body: { 
      fk_Usuario_id_usuario: number; 
      nome_pesq: string; 
      nome_pesquisador: string; 
    } 
  }>, 
  reply: FastifyReply
) => {
  try {
    console.log('Recebendo dados do frontend:', request.body);

    const { fk_Usuario_id_usuario, nome_pesq, nome_pesquisador } = request.body;

    console.log(`fk_Usuario_id_usuario: ${fk_Usuario_id_usuario}`);
    console.log(`Nome da Pesquisa: ${nome_pesq}`);
    console.log(`Nome do Pesquisador: ${nome_pesquisador}`);
    console.log('Tentando inserir dados na tabela Pesquisa...');

    await db('Projeto_Vinculado').insert({
      fk_Usuario_id_usuario,
      nome_pesq,
      nome_pesquisador,
    });

    console.log('Dados inseridos com sucesso na tabela Pesquisa');
    return reply.send({ message: 'Pesquisa inserida com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir pesquisa:', error);
    return reply.status(500).send('Erro ao inserir pesquisa');
  }
};