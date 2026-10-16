import { prisma } from "../config/db.js";

export const addTask = async (req, res) => {
  const { listId, text } = req.body;

  const list = await prisma.todoList.findUnique({ where: { id: listId } });

  if (!list) {
    res.status(404).json({ error: "List not found" });
  }

  const task = await prisma.task.create({ data: { listId, text } });

  res.status(201).json({
    status: "201",
    message: "Task added to the list",
    data: task,
  });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { text },
  });

  res.status(200).json({
    status: "200",
    message: "Task updated",
    data: updatedTask,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({ where: { id } });

  res.status(204).end();
};
