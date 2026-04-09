async function conectarConbackend() {
      try {
        const respuesta = await fetch('/api/saludo');
        const datos = await respuesta.json();

        console.log("respuesta recibida:", datos);
        alert(datos.mensaje);

      } catch (error) {
        console.error("error al conectar con el servidor:", error);

      }




}

conectarConbackend();