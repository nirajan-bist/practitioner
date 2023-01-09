import { Router } from "express";
import ValidationError from "../errors/ValidationError";

const app = Router();

import * as Practitioner from "../modals/practitioner";
import { validateCreatePractitioner, validateUpdatePractitioner } from "../validators/practitioner";

app.get("/", async (req, res) => {
  const data = await Practitioner.fetchAll();
  res.json({ data });
});

app.post("/", validateCreatePractitioner, async (req, res) => {
  const data = { ...req.body, createdBy: req.user.id };
  const [inserted] = await Practitioner.insert(data);
  res.json({ data: inserted });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Practitioner.fetchById(id);
  res.json({ data });
});

app.put("/:id", validateUpdatePractitioner, async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const [updated] = await Practitioner.updateById(id, data);
  res.json({ data: updated });
});

app.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const [deleted] = await Practitioner.deleteById(id);
    res.json({ data: deleted });
  } catch (err) {
    next(new ValidationError(`Couldn't delete the practitioner ${id}`));
  }
});

export default app;
