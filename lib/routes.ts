import { UsuarioRoutes } from "./modules/usuario/routes/usuario.routes";

export class Routes {

    private usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();

    public routes(app): void {
        this.usuarioRoutes.routes(app);
    }
}