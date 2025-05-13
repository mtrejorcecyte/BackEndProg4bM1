import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IMateria extends mongoose.Document {  
    materia: string;
}
    

const MateriaSchema = new Schema({
    materia: {
        type: String,
        required: [true, 'materia es requerido'],
        unique: true
    }
});

const Materia = mongoose.model<IMateria>("Materia", MateriaSchema);
export default Materia;