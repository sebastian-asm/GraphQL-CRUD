import { ObjectId } from 'mongodb';

import dbConnection from './db.js';

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
      console.log(error);
      return null;
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
      console.log(error);
      return null;
    }
  },
  createStudent: async (root, { input }) => {
    try {
      const db = await dbConnection();
      const newStudent = await db.collection('students').insertOne(input);
      input._id = newStudent.insertedId;

      return input;
    } catch (error) {
      console.log(error);
      return null;
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
      console.log(error);
      return null;
    }
  },
};

export default mutations;
