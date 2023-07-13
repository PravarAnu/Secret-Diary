import Note from "../models/note.schema.js";
import User from "../models/user.schema.js"

import asyncHandler from "../services/asyncHandler.service.js";
import customError from "../utils/customError.util.js";


export const addNote = asyncHandler(async (req,res)=>{
    const{id: userId} = req.params;

    const{title, body} = req.body;

    const note = await Note.create({
        title,
        body,
        user: userId,
        createdAt: Date.now()
    });
    if(!note){
        throw new customError("Unable to create note", 500);
    }

    res.status(200).json({
        success: true,
        note
    })
});

export const updateNote = asyncHandler(async(req,res)=>{
    const {id: noteId} = req.params;
    const {title, body} = req.body;

    const note = await Note.findByIdAndUpdate(noteId, {title, body, updatedAt: Date.now()});

    if(!note){
        throw new customError("No note available", 401);
    }

    res.status(200).json({
        success: true,
        message: "The note is updated"
    })

})

export const deleteNote = asyncHandler(async(req,res)=>{
    const {id: noteId} = req.params;

    const note = await Note.findByIdAndDelete(noteId);

    if(!note){
        throw new customError("Note not found", 403);
    }

    res.status(200).json({
        success: true,
        message: "Deleted Successfully",
        note
    })

})

export const archiveNote = asyncHandler(async(req,res)=>{
    const{id: noteId} = req.params;

    const note = await Note.findByIdAndUpdate(noteId, {archived: true});

    if(!note){
        throw new customError("Note not found", 403);
    }

    res.status(200).json({
        success: true,
        message: "Note is archived"
    })
});

export const unArchiveNote = asyncHandler(async(req,res)=>{
    const{id: noteId} = req.params;

    const note = await Note.findByIdAndUpdate(noteId, {archived: false});

    if(!note){
        throw new customError("Note not found", 403);
    }

    res.status(200).json({
        success: true,
        message: "Note is unarchived"
    })
});

export const getNotes = asyncHandler(async (req,res)=>{
    const {id: userId} = req.params;

    const user = await User.findById(userId);

    if(!user){
        throw new customError("User not found",404);
    }

    const allNotes = await Note.find({user: userId});

    if(!allNotes){
        throw new customError("No notes found for this user", 403);
    }

    res.status(200).json({
        success: true,
        allNotes
    })
});

export const getUnarchivedNotes = asyncHandler(async (req,res)=>{
    const {id: userId} = req.params;

    const user = await User.findById(userId);

    if(!user){
        throw new customError("User not found",404);
    }

    const unarchivedNotes = await Note.find({user: userId, archived: false});

    if(!unarchivedNotes){
        throw new customError("No notes found for this user", 403);
    }

    res.status(200).json({
        success: true,
        unarchivedNotes
    })
});

export const getArchivedNotes = asyncHandler(async (req,res)=>{
    const {id: userId} = req.params;

    const user = await User.findById(userId);

    if(!user){
        throw new customError("User not found",404);
    }

    const archivedNotes = await Note.find({user: userId, archived: true});

    if(archivedNotes.length === 0){
        throw new customError("No archived notes found for this user", 403);
    }

    res.status(200).json({
        success: true,
        archivedNotes
    })
});