import prisma from "../db";

export async function getUpdate(req, res) {
    const upadate = await prisma.update.findFirst({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ data: upadate });
}
export async function getUpdates(req, res) {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const update = products.reduce((all, product) => {
        return [...all, ...product.updates];
    }, []);
    res.status(200).json({ data: update });
}
export async function createUpdate(req, res) {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
        },
    });
    if (!product) {
    }

    const update = await prisma.update.create({
        data: req.body,
    });
}
export async function updateUpdate(req, res) {
    const product = await prisma.product.findMany({
        where: {
            id: req.body.productId,
        },
        include: {
            updates: true,
        },
    });

    const upadates = product.reduce(
        (all, product) => [...all, ...product.updates],
        []
    );
    const match = upadates.find((update) => update.id === req.params.id);
    if (!match) {
        return res.status(404).json({ message: "Nope" });
    }
    const update = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });
    res.status(200).json({ data: update });
}
export async function deleteUpdate(req, res) {
    const product = await prisma.product.findMany({
        where: {
            id: req.body.productId,
        },
        include: {
            updates: true,
        },
    });

    const upadates = product.reduce(
        (all, product) => [...all, ...product.updates],
        []
    );
    const match = upadates.find((update) => update.id === req.params.id);
    if (!match) {
        return res.status(404).json({ message: "Nope" });
    }
    const update = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ data: update });
}
