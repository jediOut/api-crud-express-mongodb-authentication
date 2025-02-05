import mongoose from 'mongoose';
import Usuarios from '../schemas/usuarios.js'

class UsuariossModel {

   async create(usuario) {
      return await Usuarios.create(usuario);
   }

   async getAll() {
      return await Usuarios.find();
   }

   async getOneById(id) {
      return await Usuarios.findById({ _id: new mongoose.Types.ObjectId(id) });
   }
   async getOneByEmail(filtro) {
      return await Usuarios.findOne(filtro)
   }

   async update(id, usuario) {
      return await Usuarios.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, usuario, { new: true })
   }

   async delete(id) {
      return await Usuarios.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
   }

}

export default new UsuariossModel;