import { Router } from "express";
import {
  createPractitioner,
  deletePractitioner,
  fetchAllPractitioners,
  fetchOnePractitioner,
  updatePractitioner,
} from "../controllers/practitioner";

const app = Router();

import { validateCreatePractitioner, validateUpdatePractitioner } from "../validators/practitioner";

app.get("/", fetchAllPractitioners);

app.post("/", validateCreatePractitioner, createPractitioner);

app.get("/:id", fetchOnePractitioner);

app.put("/:id", validateUpdatePractitioner, updatePractitioner);

app.delete("/:id", deletePractitioner);

export default app;
