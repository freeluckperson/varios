//Max sum
const highestSum = (array) => {
  let menorSuma = array[0] + array[1];
  for (let i = 0; i < array.length - 1; i++) {
    const mayorSuma = array[i] + array[i + 1];
    if (mayorSuma > menorSuma) {
      menorSuma = mayorSuma;
    }
  }
  return menorSuma;
};

const arr = [10, 2, 3];

console.log("1ra function →", highestSum(arr));
module.exports = highestSum;

const array = [10, 2, 3];
let sum = array[0] + array[1];

for (let i = 0; i < array.length; i++) {
  for (let j = i + 1; j < array.length; j++) {
    max = Math.max(sum, array[i] + array[j]);
  }
}
console.log("2da function →", sum);
