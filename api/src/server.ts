import App from '@/app';
import AuthRoute from '@/routes/auth.routes';
import IndexRoute from '@/routes/index.routes';
import UsersRoute from '@/routes/users.routes';
import ProductsRoute from './routes/products.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ProductsRoute(), new AuthRoute()]);

app.listen();
