import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config'
import mongoose from "mongoose";

class dbClient {
    constructor() {
        // const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=adopcion`;
        // this.client = new MongoClient(queryString, {
        //     serverApi: {
        //         version: ServerApiVersion.v1,
        //         strict: true,
        //         deprecationErrors: true,
        //     }
        // });
        // this.conectarBD();
        this.conectarBaseDatos()
    }

    // async conectarBD() {
    //     try {
    //         await this.client.connect();
    //         await this.client.db("admin").command({ ping: 1 })
    //         this.db = this.client.db("adopcion");
    //         console.log("✅ Conectado a la base de datos");
    //     } catch (error) {
    //         console.error("❌ Error al conectar a la base de datos:", error);
    //         await this.client.close()
    //     }
    // }

    async cerrarConexion() {
        try {
            // await this.client.close();
            await mongoose.disconnect()
            console.log("Conexion a la base da datos cerrada")
        } catch (error) {
            console.log("Error al cerrar la conexion: ", error)
        }
    }

    async conectarBaseDatos() {
        try {
            const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adopcion?retryWrites=true&w=majority`;
            await mongoose.connect(queryString);
            console.log("✅ Conexion exitosa a la base de datos");
        } catch (error) {
            console.log("❌ Error al conectarse a la base de datos: ", error)

        }
    }



}



export default new dbClient();
