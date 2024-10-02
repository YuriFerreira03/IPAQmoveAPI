import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Definir a interface Resposta
interface Resposta {
  fk_Questao_id_questao: number;
  respostas_abertas: string | null;
  respostas_fechadas: number | null;
  resposta: string | null;
  dataHora: string;
}

// Função para classificar o nível de atividade física com base nas respostas
const classificarNivelAtividade = (respostas: Resposta[]): string => {
  let freqCaminhada = 0;
  let duracaoCaminhada = 0;
  let freqModerada = 0;
  let duracaoModerada = 0;
  let freqVigorosa = 0;
  let duracaoVigorosa = 0;

  respostas.forEach((resposta) => {
    const { fk_Questao_id_questao, respostas_abertas } = resposta;

    if ([2, 8, 14].includes(fk_Questao_id_questao)) {
      freqCaminhada += Number(respostas_abertas); // Frequência de caminhada
    } else if ([3, 9, 15].includes(fk_Questao_id_questao)) {
      duracaoCaminhada += Number(respostas_abertas); // Duração de caminhada
    } else if ([4, 10, 16].includes(fk_Questao_id_questao)) {
      freqModerada += Number(respostas_abertas); // Frequência de atividades moderadas
    } else if ([5, 11, 17].includes(fk_Questao_id_questao)) {
      duracaoModerada += Number(respostas_abertas); // Duração de atividades moderadas
    } else if ([6, 12, 18].includes(fk_Questao_id_questao)) {
      freqVigorosa += Number(respostas_abertas); // Frequência de atividades vigorosas
    } else if ([7, 13, 19].includes(fk_Questao_id_questao)) {
      duracaoVigorosa += Number(respostas_abertas); // Duração de atividades vigorosas
    }
  });

  // Classificação baseado nas regras do IPAQ
  if (freqVigorosa >= 5 && duracaoVigorosa >= 30) {
    return "Muito Ativo";
  }
  if (
    freqVigorosa >= 3 &&
    duracaoVigorosa >= 20 &&
    (freqModerada >= 5 || freqCaminhada >= 5)
  ) {
    return "Muito Ativo";
  }
  if (freqVigorosa >= 3 || freqModerada >= 5 || freqCaminhada >= 5) {
    return "Ativo";
  }
  if (freqModerada >= 5 || freqCaminhada + freqModerada + freqVigorosa >= 150) {
    return "Irregularmente Ativo A";
  }
  if (freqCaminhada > 0 || freqModerada > 0 || freqVigorosa > 0) {
    return "Irregularmente Ativo B";
  }
  return "Sedentário";
};

export const respostasController = async (
  request: FastifyRequest<{
    Params: {
      fk_Usuario_id_usuario: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { fk_Usuario_id_usuario } = request.params;

    console.log(`Buscando respostas para o usuário: ${fk_Usuario_id_usuario}`);

    const respostas = await db("Responde")
      .join(
        "Questao",
        "Responde.fk_Questao_id_questao",
        "=",
        "Questao.id_questao"
      )
      .select(
        "Responde.fk_Questao_id_questao",
        "Responde.respostas_abertas",
        "Responde.respostas_fechadas",
        "Responde.resposta",
        "Questao.texto_pergunta as questao",
        "Responde.dataHora"
      )
      .where("Responde.fk_Usuario_id_usuario", fk_Usuario_id_usuario)
      .andWhere("Responde.fk_Questao_id_questao", ">", 0) // Excluir id_questao = 0
      .andWhere("Responde.dataHora", function () {
        this.select("dataHora")
          .from("Responde as r2")
          .whereRaw("r2.fk_Questao_id_questao = Responde.fk_Questao_id_questao")
          .orderBy("r2.dataHora", "desc")
          .limit(1);
      })
      .orderBy("Responde.fk_Questao_id_questao", "asc"); // Ordenar do menor para o maior

    if (respostas.length === 0) {
      return reply.status(404).send({
        message: "Nenhuma resposta encontrada para esse usuário",
      });
    }

    // Classificar o nível de atividade física com base nas respostas
    const classificacao = classificarNivelAtividade(respostas);

    console.log("Respostas encontradas:", respostas);
    return reply.send({ respostas, classificacao }); // Enviar as respostas com a classificação
  } catch (error) {
    console.error("Erro ao buscar respostas:", error.message || error);
    return reply.status(500).send({
      error: "Erro ao buscar respostas",
      details: error.message || error,
    });
  }
};
