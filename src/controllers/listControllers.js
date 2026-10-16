import { prisma } from "../config/db.js";

export const getAllLists = async (req, res) => {
  const lists = await prisma.todoList.findMany();

  if (lists.length === 0) {
    res.status(404).json({ error: "No to-do lists found" });
  }

  res.status(200).json({
    status: "200",
    message: "To-do lists found ",
    total: lists.length,
    data: lists,
  });
};

export const addList = async (req, res) => {
  const { title } = req.body;

  const newList = await prisma.todoList.create({
    data: {
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  res.status(201).json({
    status: "201",
    message: "List created",
    data: newList,
  });
};

export const updateListName = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const list = await prisma.todoList.findUnique({ where: { id } });

  if (!list) {
    res.status(404).json({ error: "To-do list not found" });
  }

  const updatedList = await prisma.todoList.update({
    where: { id },
    data: {
      title,
      updatedAt: new Date().toISOString(),
    },
  });

  res.status(200).json({
    status: "200",
    message: "To-do list updated",
    data: updatedList,
  });
};

export const deleteList = async (req, res) => {
  const { id } = req.params;

  const list = await prisma.todoList.findUnique({
    where: { id },
  });

  if (!list) {
    res.status(404).json({ error: "To-do list not found" });
  }

  await prisma.todoList.delete({ where: { id } });

  res.status(204).end();
};
