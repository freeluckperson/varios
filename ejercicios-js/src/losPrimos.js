function soloPrimos(num) {
  if (num < 2) return false;

  let i = 2;
  while (i < num) {
    if (num % i === 0) return false;
    i++;
  }
  return true;
}
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrayDePrimos = [];
/* let arrayDePrimos = array.filter((ele) => soloPrimos(ele));
console.log(arrayDePrimos); */
//2-3-5-7
/* console.log(array2); */

for (const num of array) {
  if (soloPrimos(num)) {
    arrayDePrimos.push(num);
  }
}

console.log(arrayDePrimos);
