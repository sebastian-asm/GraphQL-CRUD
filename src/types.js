import { ObjectId } from 'mongodb';

import dbConnection from './db.js';
import errorHandler from './errorHandler.js';

const types = {
  Course: {
    people: async ({ people }) => {
      try {
        const db = await dbConnection();
        const peopleIds = people ? people.map((id) => ObjectId(id)) : [];
        let peopleData;

        if (peopleIds.length > 0) {
          peopleData = await db
            .collection('students')
            .find({ _id: { $in: peopleIds } })
            .toArray();
        } else {
          peopleData = [];
        }

        return peopleData;
      } catch (error) {
        errorHandler(error);
      }
    },
  },
  Person: {
    // manipulando la interface y determina si es del tipo Monitor o Student
    __resolveType: (person, context, info) => {
      if (person.phone) return 'Monitor';
      else return 'Student';
    },
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) return 'Course';
      if (item.phone) return 'Monitor';
      if (item.avatar) return 'Student';
    },
  },
};

export default types;
