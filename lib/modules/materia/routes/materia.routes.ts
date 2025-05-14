import { MateriaController } from "../controllers/materia.controller";

export class MateriaRoutes {
    private materiaController: MateriaController = new MateriaController(); 
    
    public routes(app): void {
        app.route('/materia')
        .get(this.materiaController.obtenerMaterias)
        .post(this.materiaController.crearMateria);

        app.route('/materia/:id')
        .put(this.materiaController.actualizarMateria)
        .delete(this.materiaController.eliminarMateria);
    }
}