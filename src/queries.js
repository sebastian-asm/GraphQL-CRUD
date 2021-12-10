import { ObjectId } from 'mongodb';

import dbConnection from './db.js';

const queries = {
  getCourses: async () => {
    try {
      const db = await dbConnection();
      const courses = await db.collection('courses').find().toArray();

      return courses;
    } catch (error) {
      return error;
    }
  },
  getCourse: async (root, { id }) => {
    try {
      const db = await dbConnection();
      const course = await db
        .collection('courses')
        .findOne({ _id: ObjectId(id) });

      return course;
    } catch (error) {
      return error;
    }
  },
  getStudents: async () => {
    try {
      const db = await dbConnection();
      const students = await db.collection('students').find().toArray();

      return students;
    } catch (error) {
      return error;
    }
  },
  getStudent: async (root, { id }) => {
    try {
      const db = await dbConnection();
      const student = await db
        .collection('students')
        .findOne({ _id: ObjectId(id) });

      return student;
    } catch (error) {
      return error;
    }
  },
};

export default queries;
