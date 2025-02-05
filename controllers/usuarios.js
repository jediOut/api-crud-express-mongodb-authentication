import usuariosModel from '../models/usuarios.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken } from '../helpers/authentication.js';

class usuariosCOntroller {
    constructor() {

    }

    async register(req, res) {
        try {
            const { email, nombre, telefono, clave } = req.body;

            const usuarioExiste = await usuariosModel.getOneByEmail({ email })
            if (usuarioExiste) {
                return new res.status(400).json({ error: 'El usuario ya existe' })
            }

            const claveEncriptada = await bcrypt.hash(clave, 10);
            const data = await usuariosModel.create({
                email,
                nombre,
                telefono,
                clave: claveEncriptada
            });
            res.status(201).json(data);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);

        }
    }

    async login(req, res) {
        const { email, clave } = req.body;

        const usuarioExiste = await usuariosModel.getOneByEmail({ email });
        if (!usuarioExiste) {
            return res.status(400).json({ error: "El usario no existe" });
        }

        const claveValida = await bcrypt.compare(clave, usuarioExiste.clave);

        if (!claveValida) {
            return res.status(400).json({ error: "Clave Incorrecta" })
        }

        const token = generateToken(email);

        return res.status(200).json({ msg: "Usuario autenticado", token });
    }
    async profile(req, res) {
        try {
            console.log(req.emailConectado);
            const data = await usuariosModel.getOneByEmail({ email: req.emailConectado });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
export default new usuariosCOntroller();