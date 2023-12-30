import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import contactController from "../controllers/contact";

const router = Router();

router.use(verifyToken);

router.get("/all", contactController.getContacts);
router.get("/:contactId/detail", contactController.getContactById);
router.get("/count", contactController.getContactCount);
router.get("/trash", contactController.getAllTrash);

router.post("/create", contactController.createContact);

router.put("/:contactId/update", contactController.updateContact);
router.put("/:contactId/favourite", contactController.addFavourite);
router.put("/:contactId/recover", contactController.recoverContact);
router.put("/:contactId/label", contactController.updateContactLabel);

router.delete("/remove", contactController.removeContact);
router.delete("/:contactId/favourite", contactController.removeFavourite);
router.delete("/trash", contactController.clearTrash);

export default router;
