import { randomUUID } from "crypto";
import prisma from "../db";
export async function getProducts(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true,
        },
    });
    res.status(200).json({ data: user.products });
}

export async function getProduct(req, res) {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id: id,
            belongsToId: req.user.id,
        },
    });
    res.status(200).json({ data: product });
}

export async function createProduct(req, res) {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id,
        },
    });
    res.status(200).json({ data: product });
}

export async function updateProduct(req, res) {
    const id = req.params.id;
    const product = await prisma.product.update({
        where: {
            id: id,
            belongsToId: req.user.id,
        },
        data: {
            name: req.body.name,
        },
    });
}

export async function deleteProduct(req, res) {
    const id = req.params.id;
    const product = await prisma.product.delete({
        where: {
            id: id,
            belongsToId: req.user.id,
        },
    });
    res.status(200).json({ data: product });
}
