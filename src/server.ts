import fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import userRoutes from "./routes/userRoutes";
import pesquisaRoutes from "./routes/pesquisaRoutes";
import { secaoRoutes } from "./routes/secaoRoutes";
import { questaoRoutes } from "./routes/questaoRoutes";
import { respondeRoutes } from "./routes/respondeRoutes";


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
    console.log(`Server listening at http://192.168.1.231`);
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
