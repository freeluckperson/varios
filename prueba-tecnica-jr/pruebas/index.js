// const products = [
//   { name: "cloro", price: 8, inOffer: true },
//   { name: "champu", price: 6, inOffer: false },
//   { name: "jabon", price: 4, inOffer: false },
//   { name: "aceite", price: 8, inOffer: true },
//   { name: "pasta", price: 3, inOffer: true },
// ];

// const discountedProducts = products.map((product) => {
//   if (product.inOffer) {
//     return { ...product, price: product.price - product.price * 0.09 };
//   }
//   return product;
// });

// console.log(discountedProducts);
// console.log(products);

// Formatear fechas en javascript
// const format = (date, locale, options) =>
//   new Intl.DateTimeFormat(locale, options).format(date);

// const now = new Date();

// console.log(format(now, "es"));
// console.log(format(now, "en"));
// console.log(format(now, "es", { dateStyle: "long" }));
// console.log(format(now, "es", { weekday: "short", day: "numeric" }));

function findNaughtyStep(original, modified) {
  for (let i = 0; i < Math.max(original.length, modified.length); i++) {
    if (
      original[i] !== modified[i] ||
      i === original.length ||
      i === modified.length
    ) {
      return modified[i] || original[i];
    }
  }

  return "";
}

const original = "abcd";
const modified = "abcde";
console.log(findNaughtyStep(original, modified)); // Should return "e"

//VOLVIENDO AL CODE