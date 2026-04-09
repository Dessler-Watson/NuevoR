// 1. Cargamos las librerías necesarias
const express = require('express'); // El motor del servidor
const path = require('path'); // Ayuda a manejar rutas de carpetas

const app = express(); // Creamos la instancia de la aplicación
const PORT = 3000; // Definimos el puerto de escucha

// 2. MIDDLEWARE: El puente entre el cliente y el servidor
// Todo lo que esté en la carpeta 'public' se entrega al navegador
app.use(express.static(path.join(__dirname, 'public')));

// 3. NUESTRO PRIMER ENDPOINT (Punto de conexión)
// Cuando el usuario visite 'localhost:3000/api/saludo'
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: "¡Hola desde el backend de la Casimiro Sotelo!",
        estudiante: "Tu Nombre Aquí",
        universidad: "UNCSM",
        unidad: "Unidad II: Herramientas para el desarrollo Web"
    });
});

// 4. ENCENDER EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
