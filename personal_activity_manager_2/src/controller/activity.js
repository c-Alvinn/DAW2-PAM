const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const activities = await prisma.activity.findMany()

        return res.status(httpStatus.OK).send(activities);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function create(req, res) {
    try {
        const activity = await prisma.activity.create({
            data: {
                description: req.body.description,
                userId: req.body.userId,
                categoryId: req.body.categoryId,
            }
        });

        res.status(httpStatus.CREATED).send(activity);
    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const activity = await prisma.activity.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.CREATED).send(activity);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const cat = await prisma.activity.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).send("Activity removida com sucesso!")

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

async function getById(req, res) {
    const userId = parseInt(req.params.userId); // Ou req.query.userId, dependendo de como você está recebendo o userId

    try {
        if (!userId) {
            return res.status(httpStatus.BAD_REQUEST).send("UserId is required");
        }

        const activities = await prisma.activity.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(httpStatus.OK).send(activities);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

module.exports = { getAll, create, update, deleteEntity, getById }