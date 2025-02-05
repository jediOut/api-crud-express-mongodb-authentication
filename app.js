import express from "express";
import 'dotenv/config'
import routesMascotas from './routes/mascotas.js'
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js"
import routesUsuarios from './routes/usuarios.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routesUsuarios);
app.use('/pets', routesMascotas);


try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
} catch (error) {
    console.log(error);
}

process.on('SIGINT', async () => {
    dbClient.cerrarConexion();
    process.exit(0);
})