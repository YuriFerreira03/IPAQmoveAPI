import { FastifyInstance } from "fastify";
import {
  createPesquisa,
  searchPesquisa,
  getAllPesquisas,
  getUsuariosByPesquisa,
} from "../controllers/pesquisaController";

const pesquisaRoutes = async (server: FastifyInstance) => {
  server.post("/Pesquisa", createPesquisa);
  server.get("/search-pesquisa", searchPesquisa);
  server.get("/PesquisasAll", getAllPesquisas); // Para retornar todas as pesquisas
  server.get("/usuarios-pesquisa/:nome_pesq", getUsuariosByPesquisa);
};

export default pesquisaRoutes;
