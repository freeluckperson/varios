/*Dado un string comprobar si es PALINDROMO. Palindromo: son palabras que se leen de izquierda a derecha y viceversa ejemplo => ana */

function espalindromo(palabras) {
  if (typeof palabras !== "string") return "Must be a string";

  let palabraInvertida = "";
  for (let letter of palabras) {
    palabraInvertida = letter + palabraInvertida;
  }

  return palabraInvertida === palabras;
}

console.log(espalindromo(155));

module.exports = espalindromo;
