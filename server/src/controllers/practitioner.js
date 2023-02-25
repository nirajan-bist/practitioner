import ValidationError from "../errors/ValidationError";
import * as Practitioner from "../modals/practitioner";

export const fetchAllPractitioners = async (req, res) => {
  const data = await Practitioner.fetchAll();
  res.json({ data });
};

export const createPractitioner = async (req, res) => {
  const data = { ...req.body, createdBy: req.user.id };
  const [inserted] = await Practitioner.insert(data);
  res.json({ data: inserted });
};

export const fetchOnePractitioner = async (req, res) => {
  const { id } = req.params;
  const data = await Practitioner.fetchById(id);
  res.json({ data });
};

export const updatePractitioner = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const [updated] = await Practitioner.updateById(id, data);
  res.json({ data: updated });
};

export const deletePractitioner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [deleted] = await Practitioner.deleteById(id);
    res.json({ data: deleted });
  } catch (err) {
    next(new ValidationError(`Couldn't delete the practitioner ${id}`));
  }
};
