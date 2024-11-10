const fizzBuzz = require("../src/fizzBuzz");

describe("FizzBuzz test", () => {
  it("Deberia retornar un array con 100 elementos", () => {
    const result = fizzBuzz().length;
    expect(result).toBe(100);
  });
  it('debe reemplazar los múltiplos de 3 por "FIZZ"', () => {
    const resultado = fizzBuzz();
    expect(resultado[2]).toBe("FIZZ"); // índice 2 corresponde al número 3
    expect(resultado[5]).toBe("FIZZ"); // índice 5 corresponde al número 6
    expect(resultado[8]).toBe("FIZZ"); // índice 8 corresponde al número 9
  });
});
