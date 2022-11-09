// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "prisma/prisma-client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const data: any = await prisma.service.findFirst({
      where: {
        serviceName: req.body.serviceName,
      },
    });

    if (data) {
      return res.json({ error: "Este servico ja existe" });
    }

    await prisma.service.create({
      data: req.body,
    });
    return res.json({ success: "Sucesso" });
  } else if (req.method == "GET" && !req.query.id) {
    const user: any = await prisma.service.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.json(user);
  } else if (req.method == "GET") {
    const { id }: any = req.query;

    const data: any = await prisma.service.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        Agenda: {
          include: {
            client: true,
          },
        },
      },
    });

    return res.json(data);
  } else if (req.method == "DELETE") {
    const { id }: any = req.query;
    const apagar: any = await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    if (apagar) {
      return res.json({ success: "" });
    }

    return res.json({ error: "" });
  }
};

export default handler;
