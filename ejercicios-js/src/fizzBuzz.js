const fizzBuzz = () => {
  const arr1 = [];

  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      arr1.push("FIZZBUZZ");
    } else if (i % 3 === 0) {
      arr1.push("FIZZ");
    } else if (i % 5 === 0) {
      arr1.push("BUZZ");
    } else {
      arr1.push(i);
    }
  }
  return arr1;
};

module.exports = fizzBuzz;
