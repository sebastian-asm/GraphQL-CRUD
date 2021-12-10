import { ObjectId } from 'mongodb';

import dbConnection from './db.js';
import errorHandler from './errorHandler.js';

const queries = {
  getCourses: async () => {
    try {
      const db = await dbConnection();
      const courses = await db.collection('courses').find().toArray();

      return courses;
    } catch (error) {
      errorHandler(error);
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
      errorHandler(error);
    }
  },
  getPeople: async () => {
    try {
      const db = await dbConnection();
      const people = await db.collection('students').find().toArray();

      return people;
    } catch (error) {
      errorHandler(error);
    }
  },
  getPerson: async (root, { id }) => {
    try {
      const db = await dbConnection();
      const person = await db
        .collection('students')
        .findOne({ _id: ObjectId(id) });

      return person;
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default queries;
