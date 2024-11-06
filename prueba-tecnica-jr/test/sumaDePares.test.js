const sumaDePares = require("../pruebas/sumaDePares");

describe("sumaDePares", () => {
  it("Test case 1: Array with even numbers", () => {
    expect(sumaDePares([1, 2, 3, 4, 5, 6])).toBe(12);
  });

  it("Test case 2: Array with no even numbers", () => {
    expect(sumaDePares([1, 3, 5, 7])).toBe(0);
  });

  it("Test case 3: Empty array", () => {
    expect(sumaDePares([])).toBe(0);
  });
});
