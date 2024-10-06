import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

let CalculaIMC = (peso: number, estatura: number): number => {
  return peso / (estatura * estatura);
};

export const resp_perguntas_gerais = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // Buscando os dados do banco de dados
    const dados = await db("Perguntas_gerais").select(
      "fk_Usuario_id_usuario",
      "nome",
      "idade",
      "sexo",
      "peso",
      "estatura"
    );

    // Log dos dados recebidos
    console.log("Dados recebidos da tabela Perguntas_gerais:", dados);

    const resp_perguntas_gerais = (dados as any[]).map((user) => {
      const imc = CalculaIMC(user.peso, user.estatura);
      console.log(
        `Calculando IMC para o usuário ${user.nome} - Peso: ${
          user.peso
        }, Estatura: ${user.estatura}, IMC: ${imc.toFixed(2)}`
      ); // Log do cálculo do IMC
      return {
        id: user.fk_Usuario_id_usuario,
        nome: user.nome,
        idade: user.idade,
        peso: user.peso,
        sexo: user.sexo,
        estatura: user.estatura,
        imc: imc.toFixed(1), // Formata para duas casas decimais
      };
    });

    // Log da resposta final
    console.log("Resposta final:", resp_perguntas_gerais);

    return reply.send(resp_perguntas_gerais);
  } catch (error) {
    console.error("Erro ao buscar dados na tabela Perguntas Gerais", error);
    return reply
      .status(500)
      .send({ message: "Erro ao buscar dados do usuário" });
  }
};
