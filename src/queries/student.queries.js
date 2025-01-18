export const createStudentQuery = `
  INSERT INTO students (name, email, date_of_birth)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const addStudentMarksQuery = `
  INSERT INTO marks (student_id, subject, marks)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const getStudentsQuery = `
  SELECT id, name, email, date_of_birth, created_at, updated_at
  FROM students
  ORDER BY created_at DESC
  LIMIT $1 OFFSET $2;
`;

export const countStudentsQuery = `
  SELECT COUNT(*) FROM students;
`;

export const getStudentByIdQuery = `
  SELECT s.*, m.subject, m.marks
  FROM students s
  LEFT JOIN marks m ON s.id = m.student_id
  WHERE s.id = $1;
`;

export const updateStudentQuery = `
  UPDATE students
  SET name = $1, email = $2, date_of_birth = $3, updated_at = CURRENT_TIMESTAMP
  WHERE id = $4
  RETURNING *;
`;

export const deleteStudentQuery = `
  DELETE FROM students WHERE id = $1 RETURNING *;
`;

export const upsertMarksQuery = `
  INSERT INTO marks (student_id, subject, marks)
  VALUES ($1, $2, $3)
  ON CONFLICT (student_id, subject)
  DO UPDATE SET marks = EXCLUDED.marks
  RETURNING *;
`;

export const deleteStudentMarksQuery = `
  DELETE FROM marks WHERE student_id = $1
`;

export const getStudentByEmailQuery = `
  SELECT *
  FROM students
  WHERE email = $1;
`