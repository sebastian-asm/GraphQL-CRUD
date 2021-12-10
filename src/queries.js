import { ObjectId } from 'mongodb';

import dbConnection from './db.js';

const queries = {
  getCourses: async () => {
    try {
      const db = await dbConnection();
      const courses = await db.collection('courses').find().toArray();

      return courses;
    } catch (error) {
      console.log(error);
      return null;
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
      console.log(error);
      return null;
    }
  },
  getStudents: async () => {
    try {
      const db = await dbConnection();
      const students = await db.collection('students').find().toArray();

      return students;
    } catch (error) {
      console.log(error);
      return null;
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
      console.log(error);
      return null;
    }
  },
};

export default queries;
