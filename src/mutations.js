import { ObjectId } from 'mongodb';

import dbConnection from './db.js';
import errorHandler from './errorHandler.js';

const mutations = {
  createCourse: async (root, { input }) => {
    // manejando los campos que no son obligatorios
    const defaults = {
      teacher: '',
      topic: '',
    };

    try {
      const db = await dbConnection();
      const newCourse = await db
        .collection('courses')
        .insertOne({ ...defaults, ...input });

      input._id = newCourse.insertedId; // devuelve el ultimo id insertado
      return input;
    } catch (error) {
      errorHandler(error);
    }
  },
  updateCourse: async (root, { id, input }) => {
    try {
      const db = await dbConnection();
      await db
        .collection('courses')
        .updateOne({ _id: ObjectId(id) }, { $set: input });

      const updateStudent = await db
        .collection('courses')
        .findOne({ _id: ObjectId(id) });

      return updateStudent;
    } catch (error) {
      errorHandler(error);
    }
  },
  deleteCourse: async (root, { id }) => {
    try {
      const db = await dbConnection();
      const { deletedCount } = await db
        .collection('courses')
        .deleteOne({ _id: ObjectId(id) });

      if (deletedCount) return 'Curso eliminado exitosamente';
      else return 'El curso no existe';
    } catch (error) {
      errorHandler(error);
    }
  },
  createStudent: async (root, { input }) => {
    try {
      const db = await dbConnection();
      const newStudent = await db.collection('students').insertOne(input);
      input._id = newStudent.insertedId;

      return input;
    } catch (error) {
      errorHandler(error);
    }
  },
  updateStudent: async (root, { id, input }) => {
    try {
      const db = await dbConnection();
      await db
        .collection('students')
        .updateOne({ _id: ObjectId(id) }, { $set: input });

      const updateStudent = await db
        .collection('students')
        .findOne({ _id: ObjectId(id) });

      return updateStudent;
    } catch (error) {
      errorHandler(error);
    }
  },
  deleteStudent: async (root, { id }) => {
    try {
      const db = await dbConnection();
      const { deletedCount } = await db
        .collection('students')
        .deleteOne({ _id: ObjectId(id) });

      if (deletedCount) return 'Estudiante eliminado exitosamente';
      else return 'El estudiante no existe';
    } catch (error) {
      errorHandler(error);
    }
  },
  addPeople: async (root, { courseId, personId }) => {
    try {
      const db = await dbConnection();
      const [course, person] = await Promise.all([
        db.collection('courses').findOne({ _id: ObjectId(courseId) }),
        db.collection('students').findOne({ _id: ObjectId(personId) }),
      ]);

      if (!course || !person)
        throw new Error('La persona o el curso no existe');

      await db.collection('courses').updateOne(
        { _id: ObjectId(courseId) },
        // $addToSet: busca si people es un array de lo contrario lo crea y hace push de personId
        { $addToSet: { people: ObjectId(personId) } }
      );

      return course;
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default mutations;
