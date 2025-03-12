import Note from "../models/noteTaking";
import { Request, Response } from "express";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error" });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};