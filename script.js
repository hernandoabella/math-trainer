// Globales
let resultadoTemporal = 1.01;

const hacerMatematicas = (a, b, c) => {
  switch (a) {
    case "+":
      return b + c;
    case "-":
      return b - c;
    case "*":
      return b * c;
    case "/":
      return b / c;
  }
}

const enviarRespuesta = (resultado) =>{
  document.querySelector("#formularioMatematico").addEventListener("submit", function(e) {
    e.preventDefault();
    let respuestaUsuario = document.querySelector("#respuestaEntrada").value;
    let booleano = (resultado == respuestaUsuario) ? true : false;
    if (booleano === true) {
      // Cambia el contenido....
      document.querySelector(".result").innerHTML = ("<p>¡Correcto!</p>");
      // Establece el color de fondo en verde en caso de que aciertes
      document.body.style.backgroundColor = "#3EC300";
      setTimeout(function() {
        document.body.style.backgroundColor = "var(--color-fondo)";
      }, 1000);
      // Limpia el campo de entrada
      document.querySelector("#respuestaEntrada").value = "";
      // Realiza una nueva pregunta
      creadorAleatorio();
    } else {
      // Cambia el contenido....
      document.querySelector(".result").innerHTML += ("<p>¡Incorrecto!</p>");
      // Establece el color de fondo en rojo en caso de que falles en la respuesta
      document.body.style.backgroundColor = "#FF1D15";
      //
      setTimeout(function() {
        document.querySelector(".mathQuestion").innerHTML += "";
      }, 1000);
      // Luego de 1 segundo establece el fondo al color principal 
      setTimeout(function() {
        document.body.style.backgroundColor = "var(--color-fondo)";
      }, 1000);
    }
  });
}

const creadorAleatorio = () =>{
  document.querySelector(".mathQuestion").innerHTML += "";
  // Elimina la respuesta si se utilizó una pista
  if (document.querySelector(".respuestaCorrecta")) {
    document.querySelector(".respuestaCorrecta").remove();
  }
  // Configura los operadores y los números aleatorios
  let operadores = ["+", "-", "*", "/"];
  let enteroAleatorioUno = parseInt((Math.random() * 100), 10);
  let enteroAleatorioDos = parseInt((Math.random() * 100), 10);
  let operadorAleatorio = operadores[Math.floor(Math.random() * operadores.length)];
  // Cree el texto de la pregunta y configuralo en el documento
  let elemento = document.querySelector(".textoPregunta");
  elemento.innerHTML = ("").concat(enteroAleatorioUno, " ", operadorAleatorio, " ", enteroAleatorioDos);
  // Hace los cálculos y redondea los floats a dos decimales
  let resultadoPreliminar = hacerMatematicas(operadorAleatorio, enteroAleatorioUno, enteroAleatorioDos);
  let esFlotante = (!Number.isInteger(resultadoPreliminar)) ? true : false;
  let resultado = (esFlotante === true) ? resultadoPreliminar.toFixed(2) : resultadoPreliminar;
  resultadoTemporal = resultado;
  // Establece el detector de eventos para el formulario según el tipo de navegador
  let respuestaEntradaUsuario = document.querySelector("#respuestaEntrada");
  if (respuestaEntradaUsuario.addEventListener) {
    respuestaEntradaUsuario.addEventListener("submit", enviarRespuesta(resultado), false);
  } else if (respuestaEntradaUsuario.attachEvent) {
    respuestaEntradaUsuario.attachEvent("onsubmit", enviarRespuesta(resultado));
  }
  return resultado;
}

const respuestaAyuda = () => {
  // Asegúrate de que la respuesta no se muestre todavía
  if (!document.querySelector(".respuestaCorrecta")) {
    // Muestra la respuesta
    document.querySelector(".result").innerHTML += ("<p class='respuestaCorrecta'>La respuesta correcta es: " + "<br><br><b>" + resultadoTemporal + "</b>" + "</p>");
  }
}
