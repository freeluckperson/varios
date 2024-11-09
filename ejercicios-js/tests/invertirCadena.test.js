const invertirCadena = require("../src/invertirCadena");

describe("Función invertirCadena", () => {
  it("debe invertir la cadena 'ajo' correctamente", () => {
    expect(invertirCadena("ajo")).toEqual("oja");
  });

  it("debe invertir la cadena 'martha' correctamente", () => {
    expect(invertirCadena("martha")).toEqual("ahtram");
  });

  // Puedes agregar más pruebas aquí si lo deseas
});
