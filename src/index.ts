import fastify from "fastify";
import knex from "knex";
import cors from "@fastify/cors";

const server = fastify();

// Adicione suporte ao CORS
server.register(cors, {
  origin: "*", // Permite todas as origens, ajuste conforme necessário
});

const db = knex({
  client: "mysql2",
  connection: {
    host: "ipaqmove.linceonline.com.br",
    user: "ipaqmove_user",
    password: "0b(=S^+zWUDb",
    database: "ipaqmove_banco",
  },
});

server.get("/ping", async (request, reply) => {
  return "Lamoia\n";
});

server.get("/usuario", async (request, reply) => {
  try {
    const users = await db("Usuario").select("*").orderBy("id_usuario", "asc");
    return reply.send(users?.[0]);
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send("Erro ao buscar usuários");
  }
});

server.post("/usuario", async (request, reply) => {
  try {
    const { name, type } = request.body;
    await db("Usuario").insert({ nome: name, tipo: type });
    return reply.send({ message: "Usuário inserido com sucesso" });
  } catch (error) {
    console.error("Error inserting user:", error);
    return reply.status(500).send("Erro ao inserir usuário");
  }
});

const startServer = async () => {
  try {
    await server.listen({ port: 8080, host: '0.0.0.0' }); // Adicione host 0.0.0.0 para ouvir em todas as interfaces de rede
    console.log(`Server listening at http://localhost:8080`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await server.close();
  await db.destroy();
  process.exit(0);
});

startServer();
