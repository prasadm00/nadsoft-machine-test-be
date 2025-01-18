import { pool } from '../config/db.js';
import {
  createStudentQuery,
  addStudentMarksQuery,
  getStudentsQuery,
  countStudentsQuery,
  getStudentByIdQuery,
  updateStudentQuery,
  deleteStudentQuery,
  upsertMarksQuery,
  deleteStudentMarksQuery,
} from '../queries/student.queries.js';

const handleError = (operation, error) => {
  console.error(`Error during ${operation}:`, error.message);
  throw new Error(`Failed to ${operation}. Please try again later.`);
};

const upsertMarks = async (studentId, marks) => {
  await pool.query(deleteStudentMarksQuery, [studentId]);
  if (marks && Array.isArray(marks)) {
    for (let mark of marks) {
      const { subject, marks: markValue } = mark;
      await pool.query(upsertMarksQuery, [studentId, subject, markValue]);
    }
  }
};

export const createStudent = async (data) => {
  try {
    const { name, email, date_of_birth, marks } = data;
    const result = await pool.query(createStudentQuery, [
      name,
      email,
      date_of_birth,
    ]);
    const student = result.rows[0];

    await upsertMarks(student.id, marks);

    return student;
  } catch (error) {
    handleError('create a student', error);
  }
};

export const addStudentsMarks = async (id, data) => {
  try {
    const { subject, marks } = data;
    const result = await pool.query(addStudentMarksQuery, [id, subject, marks]);
    return result.rows[0];
  } catch (error) {
    handleError('add marks for a student', error);
  }
};

export const getStudents = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const [studentsResult, countResult] = await Promise.all([
      pool.query(getStudentsQuery, [limit, offset]),
      pool.query(countStudentsQuery),
    ]);

    const totalCount = parseInt(countResult.rows[0].count, 10);

    return {
      data: studentsResult.rows,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      pageSize: limit,
    };
  } catch (error) {
    handleError('retrieve students', error);
  }
};

export const getStudentById = async (id) => {
  try {
    const result = await pool.query(getStudentByIdQuery, [id]);
    if (result.rows.length === 0) return null;
    const studentData = result.rows.reduce((student, row) => {
      if (!student) {
        student = {
          id: row.id,
          name: row.name,
          email: row.email,
          date_of_birth: row.date_of_birth,
          created_at: row.created_at,
          updated_at: row.updated_at,
          marks: [],
        };
      }
      if (row.subject && row.marks !== null) {
        student.marks.push({
          subject: row.subject,
          marks: row.marks,
        });
      }
      return student;
    }, null);

    return studentData;
  } catch (error) {
    handleError('retrieve a student by ID', error);
  }
};

export const updateStudent = async (id, data) => {
  try {
    const { name, email, date_of_birth, marks } = data;
    const result = await pool.query(updateStudentQuery, [
      name,
      email,
      date_of_birth,
      id,
    ]);

    await upsertMarks(id, marks);

    return result.rows[0];
  } catch (error) {
    handleError('update a student', error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const result = await pool.query(deleteStudentQuery, [id]);
    return result.rows[0];
  } catch (error) {
    handleError('delete a student', error);
  }
};
