import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";
import {
  PegandoQuestoes,
  CaminhadaDuracaoTotal,
  ModeradaDuracaoTotal,
  VigorosaDuracaoTotal,
} from "../controllers/respostasDuracaoFrequenciaClassificacaoController";

const inicializarUsuario = () => ({
  Q1G: 0,
  Q2D: 0,
  Q3F: 0,
  Q4F: 0,
  Q1F: 0,
  Q2C: 0,
  Q3E: 0,
  Q4E: 0,
  Q1B: 0,
  Q2E: 0,
  Q4A: 0,
  Q1C: 0,
  Q2F: 0,
  Q4B: 0,
  Q1E: 0,
  Q3B: 0,
  Q3D: 0,
  Q4D: 0,
  Q1D: 0,
  Q3A: 0,
  Q3C: 0,
  Q4C: 0,
});

export const classificacaoResumo = async (
  req: FastifyRequest<{ Querystring: { nome_pesq: string } }>,
  reply: FastifyReply
) => {
  try {
    const { nome_pesq } = req.query;

    if (!nome_pesq) {
      return reply
        .status(400)
        .send({ message: "O nome da pesquisa é obrigatório." });
    }

    // Obtendo os IDs dos usuários vinculados ao projeto especificado
    const usuariosVinculados = await db("Projeto_Vinculado")
      .where("nome_pesq", nome_pesq)
      .select("fk_Usuario_id_usuario");

    if (usuariosVinculados.length === 0) {
      return reply
        .status(404)
        .send({ message: "Nenhum usuário vinculado a esta pesquisa." });
    }

    const idsUsuarios = usuariosVinculados.map((u) => u.fk_Usuario_id_usuario);

    // Filtrando as respostas apenas para os usuários vinculadoconst totalUsuarioss ao projeto
    const respostas = await db("Responde")
      .select(
        "fk_Usuario_id_usuario",
        "fk_Questao_id_questao",
        "respostas_abertas"
      )
      .whereIn("fk_Usuario_id_usuario", idsUsuarios);

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = inicializarUsuario();
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resumo = {
      sedentario: 0,
      irregularAtivoA: 0,
      irregularAtivoB: 0,
      ativo: 0,
      muitoAtivo: 0,
    };

    Object.keys(usuarios).forEach((id) => {
      const user = usuarios[Number(id)];
      const totalAtividade =
        CaminhadaDuracaoTotal(user.Q1C, user.Q2F, user.Q4B) +
        ModeradaDuracaoTotal(user.Q1E, user.Q2D, user.Q3B, user.Q3D, user.Q4D) +
        VigorosaDuracaoTotal(user.Q1G, user.Q2D, user.Q3F, user.Q4F);

      if (totalAtividade === 0) resumo.sedentario++;
      else if (totalAtividade < 150) resumo.irregularAtivoA++;
      else if (totalAtividade >= 150 && totalAtividade < 300) resumo.ativo++;
      else resumo.muitoAtivo++;
    });

    const totalUsuarios = await db("Responde")
      .whereIn("fk_Usuario_id_usuario", idsUsuarios)
      .countDistinct("fk_Usuario_id_usuario as total")
      .first();
    const totalParticipantes = totalUsuarios?.total || 0;

    // Calculando porcentagens
    const resumoPorcentagens = {
      sedentario: totalParticipantes
        ? ((resumo.sedentario / totalParticipantes) * 100).toFixed(2)
        : "0.00",
      irregularAtivoA: totalParticipantes
        ? ((resumo.irregularAtivoA / totalParticipantes) * 100).toFixed(2)
        : "0.00",
      irregularAtivoB: totalParticipantes
        ? ((resumo.irregularAtivoB / totalParticipantes) * 100).toFixed(2)
        : "0.00",
      ativo: totalParticipantes
        ? ((resumo.ativo / totalParticipantes) * 100).toFixed(2)
        : "0.00",
      muitoAtivo: totalParticipantes
        ? ((resumo.muitoAtivo / totalParticipantes) * 100).toFixed(2)
        : "0.00",
    };

    // Calcular total de participantes por sexo
    const sexosParticipantes = await db("Perguntas_gerais")
      .select("fk_Usuario_id_usuario", "sexo")
      .whereIn("fk_Usuario_id_usuario", idsUsuarios)
      .distinct("fk_Usuario_id_usuario"); // Garante que cada participante é contado apenas uma vez

    const totalMasculino = sexosParticipantes.filter(
      (p) => p.sexo === "Masculino"
    ).length;
    const totalFeminino = sexosParticipantes.filter(
      (p) => p.sexo === "Feminino"
    ).length;

    const totalOutros = totalParticipantes - (totalMasculino + totalFeminino);

    // Agora calculamos a porcentagem de cada
    // Verificamos se totalParticipantes > 0 para evitar divisão por zero
    const masculinoPercent = totalParticipantes
      ? ((totalMasculino / totalParticipantes) * 100).toFixed(2)
      : "0";

    const femininoPercent = totalParticipantes
      ? ((totalFeminino / totalParticipantes) * 100).toFixed(2)
      : "0";

    const outrosPercent = totalParticipantes
      ? ((totalOutros / totalParticipantes) * 100).toFixed(2)
      : "0";

    // Calcular total de participantes por localidade
    const localidadesParticipantes = await db("Usuario")
      .select("localidade")
      .whereIn("id_usuario", idsUsuarios)
      .groupBy("localidade")
      .count({ total: "localidade" });

    // Total de localidades em porcentagem
    const localidadesPercent = localidadesParticipantes.map((item) => ({
      localidade: item.localidade,
      percent: totalParticipantes
        ? ((item.total / totalParticipantes) * 100).toFixed(2)
        : "0.00",
    }));

    // Calcular total de participantes por faixa etária
    const idadesParticipantes = await db("Perguntas_gerais")
      .select("idade")
      .whereIn("fk_Usuario_id_usuario", idsUsuarios)
      .distinct("fk_Usuario_id_usuario"); // Garante que cada participante é único

    // Ajustar as faixas para 15 anos (até 50+) e criar o contador
    const faixaEtariaContagem = {
      "0-14": 0,
      "15-29": 0,
      "30-44": 0,
      "45-49": 0,
      "50+": 0,
    };

    // Contar participantes em cada faixa etária
    idadesParticipantes.forEach((item) => {
      if (item.idade >= 0 && item.idade <= 14) faixaEtariaContagem["0-14"]++;
      else if (item.idade >= 15 && item.idade <= 29)
        faixaEtariaContagem["15-29"]++;
      else if (item.idade >= 30 && item.idade <= 44)
        faixaEtariaContagem["30-44"]++;
      else if (item.idade >= 45 && item.idade <= 49)
        faixaEtariaContagem["45-49"]++;
      else if (item.idade >= 50) faixaEtariaContagem["50+"]++;
    });

    // Total de participantes em cada faixa etária em porcentagem
    const faixaEtariaPercent = Object.keys(faixaEtariaContagem).map(
      (faixa) => ({
        faixa,
        percent: totalParticipantes
          ? ((faixaEtariaContagem[faixa] / totalParticipantes) * 100).toFixed(2)
          : "0.00",
      })
    );

    return reply.send({
      nome_pesq,
      totalParticipantes,
      totalMasculino,
      totalFeminino,
      totalOutros,
      masculinoPercent,
      femininoPercent,
      outrosPercent,
      localidades: localidadesPercent,
      faixaEtaria: faixaEtariaPercent,
      resumo: resumoPorcentagens,
    });
  } catch (error) {
    console.error("Erro ao calcular o resumo:", error);
    return reply.status(500).send({ message: "Erro ao calcular o resumo!" });
  }
};
