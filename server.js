import express from "express";
const app = express();
const PORT = 3000

//sprint 1 -----------

function Listarmensagem() { return mensagens; }

app.get("/", (req, res) => {
    res.send ("Servidor rodando! 🚀")
});

app.get("/status", (req, res) => {
    res.json({status_servidor: "online", sprint: 2});
});

app.get ("/sobre", (req,res) => {
    res.send ("Projeto Mensageiro Local");
});

app.get('/informacao', (req, res) => {
    res.json({ nome: 'SENAI', cidade: 'Valinhos', tipo: 'Privada' });
});

const cursos = [
    { id: '1', nome: 'DS' },
    { id: '2', nome: 'Elétrica' },
    { id: '3', nome: 'Mecânica' },
];

app.get('/cursos', (req, res) => {
    res.json(cursos);
});

app.get('/professor', (req, res) => {
    res.json({ nome: 'Eduardo', disciplina: 'DS', email: 'Eduardo@senai.br' });
});

const orientacoes = [
    {
        status: 'Status do servidor',
        informacao: 'informações importantes',
        cursos: 'Vizualizar os cursos disponiveis',
        professor: 'Informações sobre o professor',
    },
];

app.get('/ajuda', (req, res) => {
    res.json(orientacoes);
});

app.get("/mensagens", (req, res) => {
    res.json(Listarmensagem());
});

// sprint 2 --------

const mensagens = [
    { id: 1, usuario: 'Ana', texto: 'Bom dia!' },
    { id: 2, usuario: 'Pedro', texto: 'Olá!' },
    { id: 3, usuario: 'Maria', texto: 'Tudo bem?' },
    { id: 4, usuario: 'Lucas', texto: 'Como vai?' },
    { id: 5, usuario: 'Carla', texto: 'Até logo!' },
];

app.get("/mensagens/:id", (req, res) => {
  const mensagem = mensagens.find(m => m.id === Number(req.params.id));
  if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
  res.json(mensagem);
});

app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));

// sprint 3 ---------

function consultar (falhar = false) {
    return new promisse((resolve, reject) => {
        setTimeout(() => {
            falhar
                ? reject(new Error("Falhou"))
                : resolve(mensagens);
        }, 1000);
    });
};

app.get("/mensagens-then", (req, res) => {
    consultar()
        .then(lista => res.json(lista))
        .catch(() => res.status(500).json({ erro: "Falha na consulta" }));
});

app.get("/mensagens-async", async (req, res) => {
    try {
        res.json(await consultar());
    } catch (erro) {
        res.status(500).json({
            erro: "Falha na consulta"
        });
    }
});

app.get('/mensagens-erro', async (req, res) => {
    try {
        res.json(await consultar(true));
    } catch (erro) {
        res.status(500).json({
            erro: "Falha simulada",
        });
    }
});

app.listen(PORT, "0.0.0.0", () => console.log (`Servidor em http://localhost:${PORT}`));