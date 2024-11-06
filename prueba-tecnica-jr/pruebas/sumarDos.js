//
//Crea una funcion que reciba como primer parametro un array
// y como segundo parametro un numero que sera el resultado de sumar
// dos valores del array

const sumarDos = (arr, num) => {
  for (const num1 of arr) {
    for (const num2 of arr) {
      if (num1 + num2 === num) {
        return [num1, num2];
      }
    }
  }
  return "No Hay elementos que cumplan la condicion";
};

// const resultado = sumarDos([1, 3, 9, 8, 2], 10);
// const resultado2 = sumarDos([1, 2, 3, 4], 6);
// console.log(resultado);
// console.log(resultado2);

module.exports = sumarDos;
