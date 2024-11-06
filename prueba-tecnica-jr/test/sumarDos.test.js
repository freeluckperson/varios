const sumarDos = require("../pruebas/sumarDos");

describe("sumarDos", () => {
  xit("Debe devolver los elementos que cumplen con la suma", () => {
    expect(sumarDos([1, 2, 3, 4], 6)).toEqual([2, 4]);
  });

  xit("En caso de no existir elementos que cumplan la suma debe devolver", () => {
    expect(sumarDos([1, 2, 3, 4], 20)).toEqual(
      "No Hay elementos que cumplan la condicion"
    );
  });
});
