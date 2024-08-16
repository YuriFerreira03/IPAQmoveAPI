import { FastifyRequest, FastifyReply } from 'fastify';
import db from '../db/connection';

export const createPesquisa = async (
  request: FastifyRequest<{ 
  Body: { 
  nome_pesquisa: string; 
  fk_Usuario_id_usuario: number; 
  fk_Questionario_id_quest: number;
  localizacao: string; 
  instituicao: string 
  } 
  }>, 
  reply: FastifyReply) => {
  try {
    console.log('Recebendo dados do frontend:', request.body);

    const { nome_pesquisa, fk_Usuario_id_usuario, fk_Questionario_id_quest, localizacao, instituicao } = request.body;

    console.log(`Nome da Pesquisa: ${nome_pesquisa}`);
    console.log(`fk_Usuario_id_usuario: ${fk_Usuario_id_usuario}`);
    console.log(`fk_Questionario_id_quest: ${fk_Questionario_id_quest}`);
    console.log(`Localização: ${localizacao}`);
    console.log(`Instituição: ${instituicao}`);
    console.log('Tentando inserir dados na tabela Pesquisa...');

    await db('Pesquisa').insert({
      nome_pesq: nome_pesquisa,
      fk_Usuario_id_usuario,
      fk_Questionario_id_quest,
      localizacao,
      instituicao,
    });

    console.log('Dados inseridos com sucesso na tabela Pesquisa');
    return reply.send({ message: 'Pesquisa inserida com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir pesquisa:', error);
    return reply.status(500).send('Erro ao inserir pesquisa');
  }
};

export const searchPesquisa = async (request: FastifyRequest<{ Querystring: { query: string } }>, reply: FastifyReply) => {
  try {
    const { query } = request.query;
    const results = await db('Pesquisa')
      .where('nome_pesq', 'like', `%${query}%`)
      .select('nome_pesq', 'fk_Usuario_id_usuario', 'fk_Questionario_id_quest', 'localizacao', 'instituicao');
    
    return reply.send(results);
  } catch (error) {
    console.error('Erro ao buscar pesquisas:', error);
    return reply.status(500).send('Erro ao buscar pesquisas');
  }
};