import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  addStudentsMarks,
} from '../models/student.model.js';

export const createStudentHandler = async (req, res) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStudentsMarksHandler = async (req, res) => {
  try {
    const student = await addStudentsMarks(req.params.id, req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsHandler = async (req, res) => {
  try {
    const students = await getStudents(req.query.page, req.query.limit);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentByIdHandler = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudentHandler = async (req, res) => {
  try {
    const student = await updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudentHandler = async (req, res) => {
  try {
    const student = await deleteStudent(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
