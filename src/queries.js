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
};

export default queries;
