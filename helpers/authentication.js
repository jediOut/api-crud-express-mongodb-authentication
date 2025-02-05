import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function generateToken(email) {
    return jwt.sign({ email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
}

export function verificarToken(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const dataToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.emailConectado = dataToken.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' });
    }
}



