let str = "12345678";
console.log(str);

function quitarCaracteres() {
  while (str.length > 0) {
    str = str.slice(1);
    console.log(str);
  }
}

quitarCaracteres();
