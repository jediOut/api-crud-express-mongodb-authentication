import mongoose from 'mongoose';
import Mascota from '../schemas/mascotas.js'

class mascotasModel {

   async create(mascota) {
      return await Mascota.create(mascota);
   }

   async getAll() {
      return await Mascota.find();
   }

   async getOne(id) {
      return await Mascota.findById({ _id: new mongoose.Types.ObjectId(id) });
   }

   async update(id, mascota) {
      return await Mascota.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, mascota, { new: true })
   }

   async delete(id) {
      return await Mascota.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
   }

}

export default new mascotasModel;