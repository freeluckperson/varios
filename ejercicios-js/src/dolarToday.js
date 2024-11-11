fetch("https://pydolarve.org/api/v1/dollar?page=alcambio")
  .then((response) => response.json())
  .then((data) => console.log(data));
