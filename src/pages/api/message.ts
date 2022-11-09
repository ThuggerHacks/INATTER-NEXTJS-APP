// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "prisma/prisma-client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const data: any = await prisma.message.findFirst({
      where: {
        option: req.body.option,
      },
    });

    if (data) {
      return res.json({ error: "Esta opcao ja existe" });
    }

    await prisma.message.create({
      data: req.body,
    });
    return res.json({ success: "Sucesso" });
  } else if (req.method == "GET" && req.query.option) {
    const { option }: any = req.query;
    const data: any = await prisma.message.findFirst({
      where: {
        option: option,
      },
    });

    return res.json(data);
  } else if (req.method == "GET" && !req.query.id) {
    const data: any = await prisma.message.findMany();

    return res.json(data);
  } else if (req.method == "GET") {
    const { id }: any = req.query;

    const data: any = await prisma.message.findMany();

    return res.json(data);
  } else if (req.method == "DELETE") {
    const { id }: any = req.query;
    const apagar: any = await prisma.message.delete({
      where: { id: parseInt(id) },
    });

    if (apagar) {
      return res.json({ success: "" });
    }

    return res.json({ error: "" });
  }
};

export default handler;
