import express from 'express';
import { buscaUsuarios, insereUsuario, removeUsuarios, alteraUsuarios } from './model.js';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static('public'));

app.get('/users', async (req, res) => {
    const users = await buscaUsuarios();
    res.json(users);
})

app.post('/users', async (req, res) => {
    console.log(req.body)

    try {
        await insereUsuario({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf
        });
        res.json({
            "msg": "Usuário criado com Sucesso"
        })
    }catch(err) {
        res.json({
            "msg": "Erro ao criar usuário"
        }).status(400);
    }
})

app.put('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await alteraUsuarios(id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf
        });
        res.json({
            "msg": "Usuário alterado com Sucesso"
        })
    }catch(err) {
        res.json({
            "msg": "Erro ao alterar usuário"
        }).status(400);
    }
})

app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await removeUsuarios(id);
        res.json({
            "msg": "Usuário removido com Sucesso"
        })
    }catch(err) {
        res.json({
            "msg": "Erro ao remover usuário"
        }).status(400);
    }
})

// qualquer outra requisicao
app.use((req, res) => {
    res.status(404).send("NOT FOUND");
})

app.listen(PORT, () => {
    console.log("ESCUTANDO NA PORTA 3000");
});