import { Request, Response } from 'express';
import * as _ from 'lodash';
import Usuario from '../models/usuario.model';

export class UsuarioController {
    crearUsuario = (req: Request, res: Response) => {
        const nuevoUsuario = new Usuario(
            {
                apellidoPaterno: req.body.apellidoPaterno,
                apellidoMaterno: req.body.apellidoMaterno,
                nombre: req.body.nombre,
                userName: req.body.userName,
                password: req.body.password,
                role: req.body.role
            }
        );
        nuevoUsuario.save()
        .then(usuarioCreado => {
            res.status(201).json(
                {
                    ok: true,
                    usuario: usuarioCreado,
                    message: 'Usuario cread0'
                }
            );
        })
        .catch(error => {

        });
    }

    obtenerUsuarios = (req: Request, res: Response) => { 
        Usuario.find()
        .then(usuarios => {
            res.status(201).json(
                {
                    ok: true,
                    usuarios: usuarios
                }
            );
        })
        .catch(error => {
            return res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    actualizarUsuario = (req: Request, res: Response) => { 
        const usuario = _.pick(req.body, 'apellidoPaterno','apellidoMaterno','nombre','role');        
        Usuario.findByIdAndUpdate(req.params.id, usuario)
        .then(async usuarioActualizado => {                                   
            res.status(200).json({
                ok: true,
                usuario: usuarioActualizado,                    
                message: 'Usuario Actualizado'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    eliminarUsuario = (req: Request, res: Response) => {
        Usuario.findByIdAndDelete(req.params.id)
        .then(usuarioEliminado => {
            res.status(200).json({
                ok: true,                                 
                message: 'Usuario Eliminado'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        })
    }
}