import express from "express";
const route = express.Router();
import mascotasCOntroller  from '../controllers/mascotas.js'
import { verificarToken } from "../helpers/authentication.js";

route.post('/', mascotasCOntroller.create)
route.get('/', mascotasCOntroller.getAll)
route.get('/:id', mascotasCOntroller.getOne)
route.put('/:id', verificarToken, mascotasCOntroller.update)
route.delete('/:id',verificarToken, mascotasCOntroller.delete)
export default route;