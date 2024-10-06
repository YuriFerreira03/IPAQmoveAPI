import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Função para converter horas e minutos em minutos totais
let converterParaMinutos = (tempo: string): number => {
  const [horas, minutos] = tempo.split(":").map(Number); // Divide a string e converte para números
  return horas * 60 + minutos; // Converte horas para minutos e soma com os minutos
};

// Função para extrair o número da string na questão Q4C
let extrairNumero = (resposta: string): number | null => {
  const partes = resposta.split(",");
  const numeroStr = partes[0].trim(); // Obtém a parte numérica
  const numero = Number(numeroStr);
  return isNaN(numero) ? null : numero; // Retorna null se não for um número
};

let PegandoQuestoes = (
  fk_Questao_id_questao: number,
  respostas_abertas: any,
  usuarioRespostas: any
) => {
  // Se o id não for encontrado, retorna 0
  if (fk_Questao_id_questao === 3) {
    usuarioRespostas.Q1C = converterParaMinutos(respostas_abertas); // DURACAO CAMINHADA
  } else if (fk_Questao_id_questao === 13) {
    usuarioRespostas.Q2F = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 21) {
    usuarioRespostas.Q4B = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 2) {
    usuarioRespostas.Q1B = Number(respostas_abertas) || 0; // FREQUENCIA CAMINHADA
  } else if (fk_Questao_id_questao === 12) {
    usuarioRespostas.Q2E = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 20) {
    usuarioRespostas.Q4A = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 5) {
    usuarioRespostas.Q1E = converterParaMinutos(respostas_abertas); // DURACAO MODERADA
  } else if (fk_Questao_id_questao === 11) {
    usuarioRespostas.Q2D = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 15) {
    usuarioRespostas.Q3B = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 17) {
    usuarioRespostas.Q3D = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 23) {
    usuarioRespostas.Q4D = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 4) {
    usuarioRespostas.Q1D = Number(respostas_abertas) || 0; // FREQUENCIA MODERADA
  } else if (fk_Questao_id_questao === 10) {
    usuarioRespostas.Q2C = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 14) {
    usuarioRespostas.Q3A = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 16) {
    usuarioRespostas.Q3C = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 22) {
    const numero = extrairNumero(respostas_abertas); // Extrai o número
    usuarioRespostas.Q4C = numero !== null ? numero : 0;
  } else if (fk_Questao_id_questao === 7) {
    usuarioRespostas.Q1G = converterParaMinutos(respostas_abertas); // DURACAO VIGOROSA
  } else if (fk_Questao_id_questao === 19) {
    usuarioRespostas.Q3F = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 25) {
    usuarioRespostas.Q4F = converterParaMinutos(respostas_abertas); // DURACAO
  } else if (fk_Questao_id_questao === 6) {
    usuarioRespostas.Q1F = Number(respostas_abertas) || 0; // FREQUENCIA VIGOROSA
  } else if (fk_Questao_id_questao === 18) {
    usuarioRespostas.Q3E = Number(respostas_abertas) || 0; // FREQUENCIA
  } else if (fk_Questao_id_questao === 24) {
    usuarioRespostas.Q4E = Number(respostas_abertas) || 0; // FREQUENCIA
  } else {
    // Caso o ID não esteja listado, definir valores padrão como 0
    usuarioRespostas.Q1C = usuarioRespostas.Q1C || 0;
    usuarioRespostas.Q2F = usuarioRespostas.Q2F || 0;
    usuarioRespostas.Q4B = usuarioRespostas.Q4B || 0;
    usuarioRespostas.Q1B = usuarioRespostas.Q1B || 0;
    usuarioRespostas.Q2E = usuarioRespostas.Q2E || 0;
    usuarioRespostas.Q4A = usuarioRespostas.Q4A || 0;
    usuarioRespostas.Q1E = usuarioRespostas.Q1E || 0;
    usuarioRespostas.Q2D = usuarioRespostas.Q2D || 0;
    usuarioRespostas.Q3B = usuarioRespostas.Q3B || 0;
    usuarioRespostas.Q3D = usuarioRespostas.Q3D || 0;
    usuarioRespostas.Q4D = usuarioRespostas.Q4D || 0;
    usuarioRespostas.Q1D = usuarioRespostas.Q1D || 0;
    usuarioRespostas.Q2C = usuarioRespostas.Q2C || 0;
    usuarioRespostas.Q3A = usuarioRespostas.Q3A || 0;
    usuarioRespostas.Q3C = usuarioRespostas.Q3C || 0;
    usuarioRespostas.Q4C = usuarioRespostas.Q4C || 0;
    usuarioRespostas.Q1G = usuarioRespostas.Q1G || 0;
    usuarioRespostas.Q3F = usuarioRespostas.Q3F || 0;
    usuarioRespostas.Q4F = usuarioRespostas.Q4F || 0;
    usuarioRespostas.Q1F = usuarioRespostas.Q1F || 0;
    usuarioRespostas.Q3E = usuarioRespostas.Q3E || 0;
    usuarioRespostas.Q4E = usuarioRespostas.Q4E || 0;
  }
};

//------------------------TOTAL DURAÇÃO E FREQUÊNCIA--------------------------------

let CaminhadaDuracaoTotal = (Q1C: number, Q2F: number, Q4B: number): number => {
  return Q1C + Q2F + Q4B;
};

let CaminhadaFrequenciaTotal = (
  Q1B: number,
  Q2E: number,
  Q4A: number
): number => {
  return Q1B + Q2E + Q4A;
};

let ModeradaDuracaoTotal = (
  Q1E: number,
  Q2D: number,
  Q3B: number,
  Q3D: number,
  Q4D: number
): number => {
  return Q1E + Q2D + Q3B + Q3D + Q4D;
};

let ModeradaFrequenciaTotal = (
  Q1D: number,
  Q2C: number,
  Q3A: number,
  Q3C: number,
  Q4C: number
): number => {
  return Q1D + Q2C + Q3A + Q3C + Q4C;
};

let VigorosaDuracaoTotal = (
  Q1G: number,
  Q2D: number,
  Q3F: number,
  Q4F: number
): number => {
  return Q1G + Q2D + Q3F + Q4F;
};

let VigorosaFrequenciaTotal = (
  Q1F: number,
  Q2C: number,
  Q3E: number,
  Q4E: number
): number => {
  return Q1F + Q2C + Q3E + Q4E;
};

export const resp_caminhada_duracao_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );
    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = { Q1C: 0, Q2F: 0, Q4B: 0 };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_caminhada_duracao_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: CaminhadaDuracaoTotal(user.Q1C, user.Q2F, user.Q4B),
      };
    });
    console.log(
      "Resposta Caminhada Duração Total:",
      resp_caminhada_duracao_total
    );
    return reply.send(resp_caminhada_duracao_total);
  } catch (error) {
    console.error("Erro no cálculo da Caminhada Duração Total!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

export const resp_caminhada_frequencia_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );
    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = { Q1B: 0, Q2E: 0, Q4A: 0 };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_caminhada_frequencia_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: CaminhadaFrequenciaTotal(user.Q1B, user.Q2E, user.Q4A), // Total de caminhada moderada
      };
    });

    console.log(
      "Resposta Total Caminhada Frequencia Total:",
      resp_caminhada_frequencia_total
    );
    return reply.send(resp_caminhada_frequencia_total);
  } catch (error) {
    console.error(
      "Erro no cálculo do total da Caminhada Frequencia Total!",
      error
    );
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

export const resp_moderada_duracao_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    // Armazenar respostas por usuário
    const usuarios: { [id: number]: any } = {};

    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1E: 0,
          Q2D: 0,
          Q3B: 0,
          Q3D: 0,
          Q4D: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_moderada_duracao_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: ModeradaDuracaoTotal(
          user.Q1E,
          user.Q2D,
          user.Q3B,
          user.Q3D,
          user.Q4D
        ), // Total de caminhada vigorosa
      };
    });

    console.log(
      "Resposta Moderada Duracao Total:",
      resp_moderada_duracao_total
    );
    return reply.send(resp_moderada_duracao_total);
  } catch (error) {
    console.error("Erro no cálculo do total da Duracao Moderada!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

export const resp_frequencia_moderada_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );
    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1D: 0,
          Q2C: 0,
          Q3A: 0,
          Q3C: 0,
          Q4C: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_frequencia_moderada_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: ModeradaFrequenciaTotal(
          user.Q1D,
          user.Q2C,
          user.Q3A,
          user.Q3C,
          user.Q4C
        ), // Total de caminhada moderada
      };
    });

    console.log(
      "Resposta da Frequencia Moderada Total:",
      resp_frequencia_moderada_total
    );
    return reply.send(resp_frequencia_moderada_total);
  } catch (error) {
    console.error("Erro no cálculo da Frequencia Moderada Total!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

export const resp_vigorosa_duracao_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    // Armazenar respostas por usuário
    const usuarios: { [id: number]: any } = {};

    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1G: 0,
          Q2D: 0,
          Q3F: 0,
          Q4F: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_vigorosa_duracao_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: VigorosaDuracaoTotal(
          user.Q1G,
          user.Q2D,
          user.Q3F,
          user.Q4F
        ), // Total de caminhada vigorosa
      };
    });

    console.log(
      "Resposta Moderada Duracao Total:",
      resp_vigorosa_duracao_total
    );
    return reply.send(resp_vigorosa_duracao_total);
  } catch (error) {
    console.error("Erro no cálculo do total da Duracao Vigorosa!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

export const resp_frequencia_vigorosa_total = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );
    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1F: 0,
          Q2C: 0,
          Q3E: 0,
          Q4E: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });
    const resp_frequencia_vigorosa_total = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      return {
        id: Number(id),
        totalCaminhada: VigorosaFrequenciaTotal(
          user.Q1F,
          user.Q2C,
          user.Q3E,
          user.Q4E
        ), // Total de caminhada moderada
      };
    });

    console.log(
      "Resposta da Frequencia Vigorosa Total:",
      resp_frequencia_vigorosa_total
    );
    return reply.send(resp_frequencia_vigorosa_total);
  } catch (error) {
    console.error("Erro no cálculo da Frequencia Vigorosa Total!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

//------------------------------------DURAÇÃO MÉDIA---------------------------------------

//caminhada

let CaminhadaDuracaoMedia = (
  Q1C: number,
  Q2F: number,
  Q4B: number,
  Q1B: number,
  Q2E: number,
  Q4A: number
): number => {
  const totalDuracao = Q1C + Q2F + Q4B;
  const totalFrequencia = Q1B + Q2E + Q4A;

  if (totalFrequencia > 0) {
    return totalDuracao / totalFrequencia;
  } else {
    return 0;
  }
};

export const resp_caminhada_duracao_media = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1C: 0,
          Q2F: 0,
          Q4B: 0,
          Q1B: 0,
          Q2E: 0,
          Q4A: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resp_caminhada_duracao_media = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      const media = CaminhadaDuracaoMedia(
        user.Q1C,
        user.Q2F,
        user.Q4B,
        user.Q1B,
        user.Q2E,
        user.Q4A
      ); // Calcula a média
      return {
        id: Number(id),
        mediaCaminhadaDuracaoMedia: Number(media.toFixed(2)), // Formata a média com 2 casas decimais
      };
    });

    console.log(
      "Resposta Caminhada Duração Média:",
      resp_caminhada_duracao_media
    );
    return reply.send(resp_caminhada_duracao_media);
  } catch (error) {
    console.error("Erro no cálculo da Caminhada Duração Média!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

let DuracaoMediaModerada = (
  Q1E: number,
  Q2D: number,
  Q3B: number,
  Q3D: number,
  Q4D: number,
  Q1D: number,
  Q2C: number,
  Q3A: number,
  Q3C: number,
  Q4C: number
): number => {
  const totalDuracao = Q1E + Q2D + Q3B + Q3D + Q4D;
  const totalFrequencia = Q1D + Q2C + Q3A + Q3C + Q4C;

  if (totalFrequencia > 0) {
    return totalDuracao / totalFrequencia;
  } else {
    return 0;
  }
};

//moderada

export const resp_duracao_media_moderada = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1E: 0,
          Q2D: 0,
          Q3B: 0,
          Q3D: 0,
          Q4D: 0,
          Q1D: 0,
          Q2C: 0,
          Q3A: 0,
          Q3C: 0,
          Q4C: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resp_duracao_media_moderada = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      const media = DuracaoMediaModerada(
        user.Q1E,
        user.Q2D,
        user.Q3B,
        user.Q3D,
        user.Q4D,
        user.Q1D,
        user.Q2C,
        user.Q3A,
        user.Q3C,
        user.Q4C
      ); // Calcula a média
      return {
        id: Number(id),
        mediaModeradaDuracaoMedia: Number(media.toFixed(2)), // Formata a média com 2 casas decimais
      };
    });

    console.log(
      "Resposta Moderada Duração Média:",
      resp_duracao_media_moderada
    );
    return reply.send(resp_duracao_media_moderada);
  } catch (error) {
    console.error("Erro no cálculo da Moderada Duração Média!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

//vigorosa

let DuracaoMediaVigorosa = (
  Q1G: number,
  Q2D: number,
  Q3F: number,
  Q4F: number,
  Q1F: number,
  Q2C: number,
  Q3E: number,
  Q4E: number
): number => {
  const totalDuracao = Q1G + Q2D + Q3F + Q4F;
  const totalFrequencia = Q1F + Q2C + Q3E + Q4E;

  if (totalFrequencia > 0) {
    return totalDuracao / totalFrequencia;
  } else {
    return 0;
  }
};

export const resp_duracao_media_vigorosa = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1G: 0,
          Q2D: 0,
          Q3F: 0,
          Q4F: 0,
          Q1F: 0,
          Q2C: 0,
          Q3E: 0,
          Q4E: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resp_duracao_media_vigorosa = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      const media = DuracaoMediaVigorosa(
        user.Q1G,
        user.Q2D,
        user.Q3F,
        user.Q4F,
        user.Q1F,
        user.Q2C,
        user.Q3E,
        user.Q4E
      ); // Calcula a média
      return {
        id: Number(id),
        mediaVigorosaDuracaoMedia: Number(media.toFixed(2)), // Formata a média com 2 casas decimais
      };
    });

    console.log(
      "Resposta Vigorosa Duração Média:",
      resp_duracao_media_vigorosa
    );
    return reply.send(resp_duracao_media_vigorosa);
  } catch (error) {
    console.error("Erro no cálculo da Caminhada Duração Média!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

//frequencia media moderada + caminhada

let FrequenciaMediaModCam = (
  Q1B: number,
  Q2E: number,
  Q4A: number,
  Q1D: number,
  Q2C: number,
  Q3A: number,
  Q3C: number,
  Q4C: number
): number => {
  const totalFrequencia = Q1B + Q2E + Q4A + Q1D + Q2C + Q3A + Q3C + Q4C;

  return totalFrequencia;
};

export const resp_freq_mod_cam = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1G: 0,
          Q2D: 0,
          Q3F: 0,
          Q4F: 0,
          Q1F: 0,
          Q2C: 0,
          Q3E: 0,
          Q4E: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resp_freq_mod_cam = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      const media = FrequenciaMediaModCam(
        user.Q1B,
        user.Q2E,
        user.Q4A,
        user.Q1D,
        user.Q2C,
        user.Q3A,
        user.Q3C,
        user.Q4C
      ); // Calcula a média
      return {
        id: Number(id),
        mediaFrequenciaMediaModCam: Number(media.toFixed(2)), // Formata a média com 2 casas decimais
      };
    });

    console.log(
      "Resposta Frequencia Media Moderada + Caminhada:",
      resp_freq_mod_cam
    );
    return reply.send(resp_freq_mod_cam);
  } catch (error) {
    console.error(
      "Erro no cálculo da Frequencia Media Moderada + Caminhada!",
      error
    );
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

//duracao moderada + caminhada
let media = 0; //coloquei fora da função para conseguir utilizá-la na classificação

export const resp_dur_mod_cam = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1G: 0,
          Q2D: 0,
          Q3F: 0,
          Q4F: 0,
          Q1F: 0,
          Q2C: 0,
          Q3E: 0,
          Q4E: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const resp_dur_mod_cam = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];

      // Verifica se o usuário tem respostas para calcular as durações
      const mediaDCaminhada = CaminhadaDuracaoMedia(
        user.Q1C,
        user.Q2F,
        user.Q4B,
        user.Q1B,
        user.Q2E,
        user.Q4A
      );
      const duracaoTotalModerada = ModeradaDuracaoTotal(
        user.Q1E,
        user.Q2D,
        user.Q3B,
        user.Q3D,
        user.Q4D
      );
      const duracaoTotalCaminhada = CaminhadaDuracaoTotal(
        user.Q1C,
        user.Q2F,
        user.Q4B
      );

      // Inicializando a variável de media
      let media = 0;

      // Somente calcula a média se houver durações válidas
      if (mediaDCaminhada > 0) {
        media =
          (duracaoTotalCaminhada + duracaoTotalModerada) / mediaDCaminhada;
      }

      // Se não houver respostas válidas, retorna 0
      return {
        id: Number(id),
        mediaDuracaoMediaModCam: media > 0 ? Number(media.toFixed(2)) : 0,
      };
    });

    console.log(
      "Resposta Duração Media Moderada + Caminhada:",
      resp_dur_mod_cam
    );
    return reply.send(resp_dur_mod_cam);
  } catch (error) {
    console.error(
      "Erro no cálculo da Duração Media Moderada + Caminhada!",
      error
    );
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};

//classificacao

export const classificacao = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const respostas = await db("Responde").select(
      "fk_Usuario_id_usuario",
      "fk_Questao_id_questao",
      "respostas_abertas"
    );

    const usuarios: { [id: number]: any } = {};
    respostas.forEach((resposta: any) => {
      if (!usuarios[resposta.fk_Usuario_id_usuario]) {
        usuarios[resposta.fk_Usuario_id_usuario] = {
          Q1G: 0,
          Q2D: 0,
          Q3F: 0,
          Q4F: 0,
          Q1F: 0,
          Q2C: 0,
          Q3E: 0,
          Q4E: 0,
        };
      }
      PegandoQuestoes(
        resposta.fk_Questao_id_questao,
        resposta.respostas_abertas,
        usuarios[resposta.fk_Usuario_id_usuario]
      );
    });

    const classificacao = Object.keys(usuarios).map((id) => {
      const user = usuarios[Number(id)];
      const AV = VigorosaDuracaoTotal(user.Q1G, user.Q2D, user.Q3F, user.Q4F);
      const AT = ModeradaDuracaoTotal(
        user.Q1E,
        user.Q2D,
        user.Q3B,
        user.Q3D,
        user.Q4D
      );
      const AR = CaminhadaDuracaoTotal(user.Q1C, user.Q2F, user.Q4B);
      const AW = VigorosaFrequenciaTotal(
        user.Q1F,
        user.Q2C,
        user.Q3E,
        user.Q4E
      );
      const AX = DuracaoMediaVigorosa(
        user.Q1G,
        user.Q2D,
        user.Q3F,
        user.Q4F,
        user.Q1F,
        user.Q2C,
        user.Q3E,
        user.Q4E
      );
      const AU = ModeradaFrequenciaTotal(
        user.Q1D,
        user.Q2C,
        user.Q3A,
        user.Q3C,
        user.Q4C
      );
      const AS = CaminhadaFrequenciaTotal(user.Q1B, user.Q2E, user.Q4A);
      const AY = DuracaoMediaVigorosa(
        user.Q1G,
        user.Q2D,
        user.Q3F,
        user.Q4F,
        user.Q1F,
        user.Q2C,
        user.Q3E,
        user.Q4E
      );
      const AZ = CaminhadaDuracaoMedia(
        user.Q1C,
        user.Q2F,
        user.Q4B,
        user.Q1B,
        user.Q2E,
        user.Q4A
      );
      const BA = FrequenciaMediaModCam(
        user.Q1B,
        user.Q2E,
        user.Q4A,
        user.Q1D,
        user.Q2C,
        user.Q3A,
        user.Q3C,
        user.Q4C
      );
      const BB = media;

      if (AV + AT + AR === 0) {
        return {
          id: Number(id),
          mensagem: "Sedentário",
        };
      } else if (
        (AW >= 5 && AX >= 30) ||
        (AW >= 3 && AX >= 20 && BA >= 5 && BB >= 30)
      ) {
        return {
          id: Number(id),
          mensagem: "Muito Ativo",
        };
      } else if (
        (AW >= 3 && AX >= 20) ||
        ((AU >= 5 || AS >= 5) && (AY >= 30 || AZ >= 30)) ||
        (AW + BA >= 5 && AV + AT + AR >= 150)
      ) {
        return {
          id: Number(id),
          mensagem: "Ativo",
        };
      } else if (AW + BA >= 5 || AV + AT + AR >= 150) {
        return {
          id: Number(id),
          mensagem: "Irregularmente Ativo A",
        };
      } else {
        return {
          id: Number(id),
          mensagem: "Irregularmente Ativo B",
        };
      }
    });

    console.log("Resposta Classificação:", classificacao);
    return reply.send(classificacao);
  } catch (error) {
    console.error("Erro na Classificacao!", error);
    return reply.status(500).send({ message: "Erro ao buscar dados!" });
  }
};
