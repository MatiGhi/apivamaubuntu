const { Router } = require('express');
const { login,  
        logout} = require('../controllers/auth');

const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Loguea el usuario y obtiene el token de acceso'
 *     responses:
 *       2XX:
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: int
 *                   example: 2XX
 *                 type_user:
 *                   type: string
 *                   example: superAdmin/clientUser/clientUserNoAdmin
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Client/ClientUser/ClientUserNoAdmin, Token
 *       4XX:
 *         description: Wrong query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: int
 *                   example: 4XX
 *                 msg:
 *                   type: string
 *                   example: Username invalid / Incorrect Password
 *                 data:
 *                   type: array
 *                   example: []
 *       500:
 *         description: Wrong query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: int
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: User cannot be logged
 *                 data:
 *                   type: array
 *                   example: []
 */
router.post('/auth/login', login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Desloguea el usuario y elimina el token de acceso'
 *     responses:
 *       2XX:
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: int
 *                   example: 2XX
 *                 type_user:
 *                   type: string
 *                   example: AdminAccess/clientUser/clientUserNoAdmin
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: AdminAccess/ClientUser/ClientUserNoAdmin, Token
 *       4XX:
 *         description: Wrong query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: int
 *                   example: 4XX
 *                 msg:
 *                   type: string
 *                   example: Invalid Username or Password
 *                 data:
 *                   type: array
 *                   example: []
 *       500:
 *         description: Wrong query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: int
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: User cannot be logged out
 *                 data:
 *                   type: array
 *                   example: []
 */
router.post('/auth/logout',checkAuth,logout);

module.exports = router;
