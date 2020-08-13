import Router from 'koa-router'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AuthController from './controllers/AuthController'
import MainController from './controllers/MainController'
import FiltersController from './controllers/FiltersController'
import SpotsController from './controllers/SpotsController'

// Create router instance
const router = new Router()

// Define middlewares
const { ensureToken, verifyToken } = AuthMiddleware

// Define routes and respective methods
router.get('/', MainController.documentation)

router.post('/users/register', AuthController.register)
router.post('/users/authenticate', AuthController.authenticate)

//router.get('/filters/list', ensureToken, verifyToken, FiltersController.index)
router.get('/filters/list', FiltersController.index)
router.get('/spots/list', SpotsController.index)
router.post('/spots/add', SpotsController.add)

export default router
