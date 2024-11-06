// Dado un array de numeros devolver la suma de numeros pares

const sumaDePares = (array) =>
  array.reduce((acc, elem) => (elem % 2 === 0 ? acc + elem : acc), 0);

console.log(sumaDePares([1, 2, 4]));

module.exports = sumaDePares;


