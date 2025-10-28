import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export const insereUsuario = async ({name, email, password, cpf}) => {
    const usuario = await prisma.usuario.create({
        data: {
            name,
            email,
            password,
            cpf
        }
    });
    return usuario;
};

export const buscaUsuarios = async () => {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
}

export const removeUsuarios = async (id) => {
    const usuarios = await prisma.usuario.delete({where:{
        id
    }})
    return usuarios;
}

export const alteraUsuarios = async (id, {name, email, password, cpf}) => {
    const usuarios = await prisma.usuario.update({where:{
        id
    }, data: {
        name,
        email,
        password,
        cpf
    }})
    return usuarios;
}