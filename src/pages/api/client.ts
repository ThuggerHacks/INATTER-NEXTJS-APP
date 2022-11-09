// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "prisma/prisma-client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST" && req.body.province) {
    const data: any = await prisma.client.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (data) {
      return res.json({ error: "Email ja esta registado" });
    } else {
      await prisma.client.create({
        data: req.body,
      });

      return res.json({ success: "Sucesso" });
    }
  } else if (req.method == "POST") {
    const user: any = await prisma.client.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    return res.json(user);
  } else if (req.method == "GET") {
    const { id }: any = req.query;
    const data: any = await prisma.client.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        agenda: {
          include: {
            service: true,
          },
        },
      },
    });

    return res.json(data);
  }
};

export default handler;
