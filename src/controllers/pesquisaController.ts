import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

export const createPesquisa = async (
  request: FastifyRequest<{
    Body: {
      nome_pesquisa: string;
      fk_Usuario_id_usuario: number;
      localizacao: string;
      instituicao: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const { nome_pesquisa, fk_Usuario_id_usuario, localizacao, instituicao } =
      request.body;

    console.log(`Nome da Pesquisa: ${nome_pesquisa}`);
    console.log(`fk_Usuario_id_usuario: ${fk_Usuario_id_usuario}`);
    console.log(`Localização: ${localizacao}`);
    console.log(`Instituição: ${instituicao}`);
    console.log("Tentando inserir dados na tabela Pesquisa...");

    await db("Pesquisa").insert({
      nome_pesq: nome_pesquisa,
      fk_Usuario_id_usuario,
      localizacao,
      instituicao,
    });

    console.log("Dados inseridos com sucesso na tabela Pesquisa");
    return reply.send({ message: "Pesquisa inserida com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir pesquisa:", error);
    return reply.status(500).send("Erro ao inserir pesquisa");
  }
};

export const searchPesquisa = async (
  request: FastifyRequest<{ Querystring: { query: string } }>,
  reply: FastifyReply
) => {
  try {
    const { query } = request.query;

    // Supondo que "Usuario" é a tabela onde estão os pesquisadores
    const results = await db("Pesquisa")
      .join("Usuario", "Pesquisa.fk_Usuario_id_usuario", "Usuario.id_usuario") // Fazendo join com a tabela Usuario
      .where("Pesquisa.nome_pesq", "like", `%${query}%`)
      .select(
        "Pesquisa.nome_pesq",
        "Pesquisa.localizacao",
        "Pesquisa.instituicao",
        "Usuario.nome as nome_pesquisador" // Selecionando o nome do pesquisador
      );

    return reply.send(results);
  } catch (error) {
    console.error("Erro ao buscar pesquisas:", error);
    return reply.status(500).send("Erro ao buscar pesquisas");
  }
};

export const getAllPesquisas = async (
  request: FastifyRequest<{ Querystring: { userId: string } }>,
  reply: FastifyReply
) => {
  const { userId } = request.query;

  try {
    // Retorna apenas as pesquisas do pesquisador logado
    const pesquisas = await db("Pesquisa")
      .join("Usuario", "Pesquisa.fk_Usuario_id_usuario", "Usuario.id_usuario")
      .where("Usuario.id_usuario", userId) // Filtrando pelo userId do pesquisador logado
      .select(
        "Pesquisa.id_pesq",
        "Pesquisa.nome_pesq",
        "Pesquisa.localizacao",
        "Pesquisa.instituicao",
        "Usuario.nome as nome_pesquisador"
      );

    console.log("Pesquisas retornadas:", pesquisas); // Log para ver os resultados filtrados

    return reply.send(pesquisas);
  } catch (error) {
    console.error("Erro ao buscar pesquisas:", error);
    return reply.status(500).send("Erro ao buscar pesquisas");
  }
};

export const getUsuariosByPesquisa = async (
  request: FastifyRequest<{ Params: { nome_pesq: string } }>,
  reply: FastifyReply
) => {
  const { nome_pesq } = request.params;

  try {
    const usuarios = await db("Usuario")
      .join(
        "Projeto_Vinculado",
        "Usuario.id_usuario",
        "Projeto_Vinculado.fk_Usuario_id_usuario"
      )
      .where("Projeto_Vinculado.nome_pesq", nome_pesq) // Filtrando pelo nome da pesquisa
      .select("Usuario.id_usuario", "Usuario.nome", "Usuario.email");

    return reply.send(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários cadastrados:", error);
    return reply.status(500).send("Erro ao buscar usuários cadastrados");
  }
};
