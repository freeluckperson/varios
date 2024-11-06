const { occurCities, cityList } = require("../pruebas/variasPruebas");


describe("Varias pruebas", () => {
  it("Ciudades concurridas", () => {
    const results = occurCities(cityList);
    expect(results).toBe(true);
  });
});
