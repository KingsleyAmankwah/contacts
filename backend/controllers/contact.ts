import asyncHandler from "express-async-handler";
import Contact from "../models/contact";
import { CustomError } from "../utils";
import { Types } from "mongoose";

const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(200).send({
    message: "Contact has been created successfully",
    data: { contact: contact.toObject() },
  });
});

const getContacts = asyncHandler(async (req, res) => {
  let { q, labelId } = req.query;

  let contacts = await Contact.aggregate([
    {
      $match: {
        createdBy: new Types.ObjectId(req.user._id),
        inTrash: false,
        ...(typeof labelId === "string" && {
          labels: { $in: [new Types.ObjectId(labelId)] },
        }),
        ...(q && {
          $or: [
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
          ],
        }),
      },
    },
    {
      $project: {
        firstName: "$firstName",
        lastName: "$lastName",
        name: {
          $trim: {
            input: {
              $concat: ["$firstName", " ", { $ifNull: ["$lastName", ""] }],
            },
          },
        },
        phone: "$phone",
        email: "$email",
        jobTitle: "$jobTitle",
        company: "$company",
        colorCode: "$colorCode",
        isFavourite: "$isFavourite",
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);

  res.status(200).send({ message: "Success", data: { contacts } });
});

const getContactCount = asyncHandler(async (req, res) => {
  const count = await Contact.find({
    createdBy: req.user._id,
    inTrash: false,
  }).countDocuments();

  res.status(200).send({ message: "Success", data: { count } });
});

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId).populate("labels");

  if (!contact) {
    throw CustomError(404, "Contact not found");
  }

  if (contact.createdBy.toString() !== req.user._id) {
    throw CustomError(403, "You are not authorized to perform this action");
  }

  res.status(200).send({ data: { contact } });
});

const removeContact = asyncHandler(async (req, res) => {
  await Contact.updateMany({ _id: { $in: req.body } }, { inTrash: true });

  res.status(200).send({ message: "Contact has been deleted successfully" });
});

const recoverContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw CustomError(400, "Contact does not exist");
  }

  await Contact.findByIdAndUpdate(contactId, { inTrash: false });

  res.status(200).send({ message: "Contact has been recovered successfully" });
});

const updateContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw CustomError(404, "Contact not found");
  }

  if (contact.createdBy.toString() !== req.user._id.toString()) {
    throw CustomError(403, "You are not authorized to perform this action");
  }

  await Contact.findByIdAndUpdate(contactId, req.body);

  res.status(200).send({ message: "Contact has been updated successfully" });
});

const addFavourite = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw CustomError(404, "Contact does not exist");
  }

  await Contact.findByIdAndUpdate(contactId, { isFavourite: true });

  res
    .status(200)
    .send({ message: "Contact has been marked as favourite successfully" });
});

const removeFavourite = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw CustomError(404, "Contact does not exist");
  }

  await Contact.findByIdAndUpdate(contactId, { isFavourite: false });

  res
    .status(200)
    .send({ message: "Contact has been removed from favourite successfully" });
});

const getAllTrash = asyncHandler(async (req, res) => {
  let contacts = await Contact.find(
    {
      createdBy: req.user._id,
      inTrash: 1,
    },
    {
      firstName: 1,
      lastName: 1,
      phone: 1,
      email: 1,
      colorCode: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  ).sort({ updatedAt: 1 });

  res.status(200).send({ message: "Success", data: { contacts } });
});

const clearTrash = asyncHandler(async (req, res) => {
  await Contact.deleteMany({
    createdBy: req.user._id,
    inTrash: 1,
    ...(req.body && Array.isArray(req.body) && { _id: { $in: req.body } }),
  });

  res
    .status(200)
    .send({ message: "Contact has been permanently deleted successfully" });
});

const updateContactLabel = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw CustomError(404, "Contact not exist");
  }

  await Contact.findByIdAndUpdate(contactId, {
    labels: req.body.labels,
  });

  res
    .status(200)
    .send({ message: "Contact label has been updated successfully" });
});

const contactController = {
  createContact,
  getContacts,
  getContactById,
  getContactCount,
  updateContact,
  removeContact,
  recoverContact,
  addFavourite,
  removeFavourite,
  getAllTrash,
  clearTrash,
  updateContactLabel,
};

export default contactController;
