const buscador = (texto, palabra) => {
  const textoArr = texto.split(" ");
  let counter = 0;

  textoArr.forEach((element) => {
    if (element === palabra) {
      counter++;
    }
  });

  return `La palabra "${palabra}" aparece ${counter} veces`;
};

console.log(buscador("text y text es mucho text", "text"));
