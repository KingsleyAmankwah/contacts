import asyncHandler from "express-async-handler";
import Label from "../models/label";
import { CustomError } from "../utils";
import Contact from "../models/contact";

const createLabel = asyncHandler(async (req, res) => {
  const label = await Label.create({
    name: req.body.name,
    createdBy: req.user._id,
  });

  res
    .status(200)
    .send({ message: "Label has been created successfully", data: { label } });
});

const getAllLabels = asyncHandler(async (req, res) => {
  const labels = await Label.find({ createdBy: req.user._id });

  res.status(200).send({ message: "Success", data: { labels } });
});

const removeLabel = asyncHandler(async (req, res) => {
  const { labelId } = req.params;

  const label = await Label.findById(labelId);

  if (!label) {
    throw CustomError(400, "label does not exist!");
  }

  await Label.findByIdAndDelete(labelId);

  await Contact.updateMany(
    { createdBy: req.user._id },
    { $pull: { labels: labelId } }
  );

  res.status(200).send({ message: "Label has been deleted successfully" });
});

const updateLabel = asyncHandler(async (req, res) => {
  const { labelId } = req.params;

  const label = await Label.findById(labelId);

  if (!label) {
    throw CustomError(404, "Label not exist");
  }

  await Label.findByIdAndUpdate(labelId, { name: req.body.name });

  res.status(200).send({ message: "Label has been updated successfully" });
});

const labelController = {
  createLabel,
  getAllLabels,
  removeLabel,
  updateLabel,
};

export default labelController;
