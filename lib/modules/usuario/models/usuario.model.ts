
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let validRoles = {    
    values: ROLES,
    message: '{VALUE} is not a valid role'
};

export interface IUsuario extends mongoose.Document {  
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombre: string;
    userName: string;
    password: string;
    role: string;
    activo: boolean;
 }

 const UsuarioSchema = new Schema(
    {
        apellidoPaterno: {
            type: String,
            required: [true, 'apellidoPaterno required']
        },
        apellidoMaterno: {
            type: String,
            required: [true, 'apellidoMaterno required']
        },
        nombre: {
            type: String,
            required: [true, 'nombre required']
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'userName required']
        },
        password: {
            type: String,
            required: [true, 'password required']
        },
        role: {
            type: String,
            enum: validRoles,
            required: [true, 'role required']
        },
        active: {
            type: Boolean,
            default: true,
        },
    }
    
 );

const Usuario = mongoose.model<IUsuario>("Usuario", UsuarioSchema);
export default Usuario;