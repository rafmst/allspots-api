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

router.get('/filters', FiltersController.list)
router.get('/spots', SpotsController.list)
router.post('/spots/add', ensureToken, verifyToken, SpotsController.add)
router.get('/spots/:slug', SpotsController.single)

export default router
