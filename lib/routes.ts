import { MateriaRoutes } from "./modules/materia/routes/materia.routes";
import { UsuarioRoutes } from "./modules/usuario/routes/usuario.routes";

export class Routes {

    private usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    private materiaRoutes: MateriaRoutes = new MateriaRoutes();

    public routes(app): void {
        this.usuarioRoutes.routes(app);
        this.materiaRoutes.routes(app);
    }
}