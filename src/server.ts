import fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import userRoutes from "./routes/userRoutes";
import pesquisaRoutes from "./routes/pesquisaRoutes";
import { secaoRoutes } from "./routes/secaoRoutes";
import { questaoRoutes } from "./routes/questaoRoutes";
import respondeRoutes from "./routes/respondeRoutes";
import perguntas_geraisRoutes from "./routes/perguntas_geraisRoutes";
import Projeto_VinculadoRoutes from "./routes/Projeto_VinculadoRoutes";
import Login from "./routes/userLoginRoutes";
import respostasRoutes from "./routes/respostasRoutes";
import respostaPerguntasGeraisRoutes from "./routes/respostaPerguntasGeraisRoute";
import respostasTotaisSession1Routes from "./routes/respostasTotaisSession1Routes";
import respostasTotaisSession2Routes from "./routes/respostasTotaisSession2Routes";
import respostasTotaisSession3Routes from "./routes/respostasTotaisSession3Routes";
import respostasTotaisSession4Routes from "./routes/respostasTotaisSession4Routes";
import respostasDuracaoFrequenciaClassificacaoRoutes from "./routes/respostasDuracaoFrequenciaClassificacaoRoutes";
import db from "./db/connection";

const server = fastify();

server.register(cors, {
  origin: "*",
});

server.register(formbody);
server.register(userRoutes);
server.register(pesquisaRoutes);
server.register(secaoRoutes);
server.register(questaoRoutes);
server.register(respondeRoutes);
server.register(perguntas_geraisRoutes);
server.register(Projeto_VinculadoRoutes);
server.register(Login);
server.register(respostasRoutes);
server.register(respostaPerguntasGeraisRoutes);
server.register(respostasTotaisSession1Routes);
server.register(respostasTotaisSession2Routes);
server.register(respostasTotaisSession3Routes);
server.register(respostasTotaisSession4Routes);
server.register(respostasDuracaoFrequenciaClassificacaoRoutes);

server.get("/ping", async (request, reply) => {
  return "Lamoia\n";
});

server.get("/test-db", async (request, reply) => {
  try {
    const result = await db.raw("SELECT 1+1 AS result");
    return reply.send({
      message: "Conexão com o banco de dados bem-sucedida",
      result: result[0],
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    return reply.status(500).send("Erro ao conectar com o banco de dados");
  }
});

const startServer = async () => {
  try {
    await server.listen({ port: 8080, host: "0.0.0.0" });
    console.log(`Server listening at http://192.168.0.106`);
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await server.close();
  process.exit(0);
});

startServer();
