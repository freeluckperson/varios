let cadena = "12345678";

function juego(cadena) {
  do {
    console.log(cadena);
    cadena = cadena.slice(1);
  } while (cadena.length > 0);
}

juego(cadena);
