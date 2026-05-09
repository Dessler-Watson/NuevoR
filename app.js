const express = require('express');
const app = express();

const db = require('./db');
// middalware de seguridad
const verificarAccesoDB = async (req, res, next) => {

    const llaveRecibida = req.query.token;

    try {

        const sql = `
            SELECT *
            FROM llaves_acceso
            WHERE token_llave = $1
        `;

        const resultado = await db.query(sql, [llaveRecibida]);

        if (resultado.rows.length > 0) {

            console.log(
                `[AUTH] Acceso válido para: ${resultado.rows[0].usuario_asignado}`
            );

            next();

        } else {

            res.status(401).send(`
                <h1>401 - Acceso No Autorizado</h1>
                <p>La llave enviada no pertenece al sistema.</p>
            `);

        }

    } catch (error) {

        console.error(error);

        res.status(500).send('Error del servidor');

    }

};
// ruta protegida
app.use(express.static('public'));

app.get(
    '/admin',
    verificarAccesoDB,
    (req, res) => {

        res.send('Bienvenido al panel administrativo ');

    }
);

// 1. Cargamos las librerías necesarias

const path = require('path'); // Ayuda a manejar rutas de carpetas


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

app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000 ');
});