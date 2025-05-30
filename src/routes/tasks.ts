import { Router } from "express";
import { prisma } from "../prisma";
import { TaskCreate, TaskUpdate } from "../schemas/task";

const router = Router();

// List
router.get("/", async (_req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Read
router.get("/:id", async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ error: "Not found" });
  res.json(task);
});

// Create
router.post("/", async (req, res) => {
  const data = TaskCreate.parse(req.body);
  const task = await prisma.task.create({ data });
  res.status(201).json(task);
});

// Update
router.put("/:id", async (req, res) => {
  const payload = TaskUpdate.parse({ ...req.body, id: req.params.id });
  const task = await prisma.task.update({
    where: { id: payload.id },
    data: {
      prompt: payload.prompt,
      schedule: payload.schedule,
      isEnabled: payload.isEnabled,
    },
  });
  res.json(task);
});

// Delete
router.delete("/:id", async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
