let cadena = "12345678";

function juego(cadena) {
  while (cadena.length > 0) {
    console.log(cadena);
    cadena = cadena.slice(1);
  }
}

juego(cadena);
