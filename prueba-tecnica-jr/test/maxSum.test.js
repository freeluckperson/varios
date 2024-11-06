const highestSum = require("../pruebas/maxSum");

describe("highestSum", () => {
  it("Should find largest sum of contiguous numbers", () => {
    const array = [0, 1, 5, 8];
    const results = highestSum(array);
    expect(results).toBe(13);
  });
});
