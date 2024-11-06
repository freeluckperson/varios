//Dado un array de enteros devolver el numero faltante
const assert = require("assert");

const valorFaltante = (arr) => {
  const n = arr.length + 1;
  const sumaEsperada = (n * (n + 1)) / 2;
  const sumaReal = arr.reduce((acc, num) => acc + num);
  return sumaEsperada - sumaReal;
};

try {
  assert.strictEqual(valorFaltante([1, 3, 4]), 2);
  assert.strictEqual(valorFaltante([1, 2, 3, 4, 6, 7]), 5);
  assert.strictEqual(valorFaltante([2, 3]), 1);
  console.log("→→ Estan pasando todos los test");
} catch (error) {
  console.error("Al menos un test esta fallando", error);
}
