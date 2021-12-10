export default function errorHandler(error) {
  console.error(error);
  throw new Error('Lamentablemente ocurrio un fallo en el servidor');
}
