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
};

export default types;
