import express from 'express';
import {
  addStudentsMarksHandler,
  createStudentHandler,
  deleteStudentHandler,
  getStudentByIdHandler,
  getStudentsHandler,
  updateStudentHandler,
} from '../controllers/student.controller.js';

const router = express.Router();

router.post('/students', createStudentHandler);
router.get('/students', getStudentsHandler);
router.get('/students/:id', getStudentByIdHandler);
router.patch('/students/:id', updateStudentHandler);
router.delete('/students/:id', deleteStudentHandler);

router.post('/students/:id/marks', addStudentsMarksHandler);

export default router;
