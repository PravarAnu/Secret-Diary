import {Router} from "express";

import {addNote, updateNote, deleteNote, archiveNote, unArchiveNote, getUnarchivedNotes, getArchivedNotes, getNotes} from "../controllers/note.controller.js";

const router = Router();

router.post("/addNote/:id", addNote);
router.put("/updateNote/:id", updateNote);

router.delete("/deleteNote/:id", deleteNote);

router.patch("/archiveNote/:id", archiveNote);
router.patch("/unArchiveNote/:id", unArchiveNote);

router.get("/allNotes/:id", getNotes);
router.get("/archivedNotes/:id", getArchivedNotes);
router.get("/unArchivedNotes/:id", getUnarchivedNotes);

export default router;