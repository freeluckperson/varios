const arrDeEnteros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrDeprimos = []; //[2, 3, 5, 7]

function esPrimo(number) {
  if (number <= 1) return false;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return true;
}

for (const num of arrDeEnteros) {
  if (esPrimo(num)) {
    arrDeprimos.push(num);
  }
}

console.log(arrDeprimos);
console.log(esPrimo(4));
