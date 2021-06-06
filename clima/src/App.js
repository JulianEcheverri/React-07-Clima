import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  // States
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  // Destructuring state
  const { ciudad, pais } = busqueda;

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  // Hook que actua similar a un document ready, si no se le pasa la dependencia
  // Detecta el componente actual
  // Se le pasa ciudad y pais para que este detectando cambios en esas dos variables
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "5b996f28e75ff6468c8949b002b87212";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const response = await fetch(url);
        const result = await response.json();
        guardarResultado(result);
        guardarConsultar(false);
        // Detecta si se encontro la ciudad
        guardarError(result.cod === "404");
      }
    };
    consultarAPI();
  }, [consultar]);

  let component = error ? (
    <Error mensaje="No hay resultados" />
  ) : (
    <Clima resultado={resultado} />
  );

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="containder">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{component}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
