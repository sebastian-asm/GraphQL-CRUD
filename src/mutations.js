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
};

export default mutations;
