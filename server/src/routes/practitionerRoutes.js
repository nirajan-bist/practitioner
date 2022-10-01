import { Router } from "express";

const app = Router();

import * as Practitioner from "../modals/practitioner";
import { validateCreatePractitioner } from "../validators/practitioner";

app.get("/", async (req, res) => {
  const data = await Practitioner.fetchAll();
  res.send(data);
});

app.post("/", validateCreatePractitioner, async (req, res) => {
  const data = { ...req.body, createdBy: req.user.id };
  const inserted = await Practitioner.insert(data);
  res.send(inserted);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Practitioner.fetchById(id);
  res.send({ text: `${id} fetched`, data });
});

app.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const updated = await Practitioner.updateById(id, data);
  res.send({ text: `${id} updated`, updated });
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Practitioner.deleteById(id);
  res.send({ text: `${id} deleted`, deleted });
});

export default app;
