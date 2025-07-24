// pages/api/memberships/index.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const members = await prisma.membership.findMany();
    return res.status(200).json(members);
  }

  if (req.method === 'POST') {
    const { name, issueDate, endDate, price, id } = req.body;
    const member = await prisma.membership.create({
      data: {
        id,
        name,
        issueDate: new Date(issueDate),
        endDate: new Date(endDate),
        price: parseFloat(price),
      },
    });
    return res.status(201).json(member);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
