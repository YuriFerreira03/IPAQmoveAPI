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
        // @ts-ignore
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

    console.log("Respostas encontradas:", respostas);
    return reply.send({ respostas }); // Enviar as respostas
  } catch (error) {
    let errorMessage = "Erro ao inserir resposta";
    if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += JSON.stringify(error);
    }
    console.error(errorMessage);
    return reply.status(500).send({
      error: "Erro ao inserir resposta",
      details: errorMessage,
    });
  }
};
