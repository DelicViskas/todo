import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function todos(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader("Content-Type", "application/json; charset=utf-8;");
  const path = request.query.path;
  
  try {
    if(path?.[0] === 'todos') {
      switch(true) {
        case Boolean(path?.[2]):
          response.status(400).send("Bad in request");
          break;
        case Boolean(path?.[1]):
          const id: number | undefined = Number(path?.[1]);
          if (!id || typeof id !== 'number') {
            response.status(400).send("Bad 'id' in request");
            break;
          }
          switch (request.method) {
            case 'GET':
              const rows = await prisma.todos.findMany({where: {id}});
              response.status(200).json(rows);
              break;
    
            case 'DELETE': {
              const delTodo = await prisma.todos.delete({ where: { id } });
              response.status(200).json(delTodo);
              break;
            }
          }
          break;
        default:
          switch (request.method) {
            case 'GET':
              const rows = await prisma.todos.findMany();
              response.status(200).json(rows);
              break;
        
            case 'POST': {
              const text = request.body.text;
              if (!text) {
                response.status(400).send("Missing 'text' in request");
                return;
              }
              const newTodo = await prisma.todos.create({ data: { text } });
              response.status(201).json(newTodo);
              break;
            }
          }    
      }
    } else {
      response.status(400).send("Bad request");
    }
   
  } catch (error) {
    console.error("Error processing request:", error);
    response.status(500).send("Internal Server Error");
  }
}
