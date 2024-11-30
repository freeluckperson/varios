function allDays(diaDeLaSemana) {
  const days = {
    1: "Domingo",
    2: "Lunes",
    3: "Martes",
    4: "Miercoles",
    5: "Jueves",
    6: "Viernes",
    7: "Sabado",
  };
  return days[diaDeLaSemana];
}

console.log(allDays(6));
