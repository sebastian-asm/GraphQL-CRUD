const courses = [
  {
    id: '1',
    title: 'test 1',
    teacher: 'Belu',
    description: 'mensaje',
    topic: 'test',
  },
  {
    id: '2',
    title: 'test 2',
    teacher: 'Seba',
    description: 'mensaje',
    topic: 'test',
  },
];

const resolvers = {
  Query: {
    getCourses: () => courses,
    getCourse: (root, args) => courses.find((course) => course.id === args.id),
  },
};

export default resolvers;
