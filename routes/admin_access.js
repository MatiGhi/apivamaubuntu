const { Router } = require('express');

const { getAdminAccess,
        getOneAdminAccess,
        postAdminAccess,
        putAdminAccess,
        resetPass } = require('../controllers/admin_access');

//Schema Validators       
const { 
        accessAdminValidation,
        accessAdminPutValidation
    } = require('../validations/index.validations'); 

//Middleware Body Validator 
const { validation } = require('../middlewares/fieldsValidator');   

//Middleware JWT
const { checkAuth } = require('../middlewares/checkAuth');
        
const router = Router();

/**
 * @openapi
 * /api/v1/admin-access:
 *   post:
 *     tags:
 *       - Admin Access
 *     summary: 'Crea un acceso de administrador'
 *     responses:
 *       200:
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
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Admin Access has been Created
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: AdminAccess, AdminAccessUser
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
 *                   example: Admin Access cannot be Created
 *                 data:
 *                   type: array
 *                   example: []
 */
router.post('/admin-access',validation(accessAdminValidation),postAdminAccess);

/**
 * @openapi
 * /api/v1/admin-access:
 *   get:
 *     tags:
 *       - Admin Access
 *     summary: 'Lista todos los accesos de administrador'
 *     responses:
 *       200:
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
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Data retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: AdminAccess
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
 *                   example: Admin Accesss cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */

//router.get('/admin-access',checkAuth,getAdminAccess);

router.get('/admin-access',checkAuth,getAdminAccess);

/**
 * @openapi
 * /api/v1/admin-access/:id:
 *   get:
 *     tags:
 *       - Admin Access
 *     summary: 'Obtiene un acceso de administrador por su ID'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Admin Access id
 *     responses:
 *       200:
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
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Data retrieved Successfully
 *                 data:
 *                   type: string
 *                   example: AdminAccess
 *       400:
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
 *                   example: 400
 *                 msg:
 *                   type: string
 *                   example: Doesn't exist an Admin Access registered with username xxx
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
 *                   example: Admin Accesss cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/admin-access/:id',checkAuth,getOneAdminAccess);

/**
 * @openapi
 * /api/v1/admin-access/:username:
 *   put:
 *     tags:
 *       - Admin Access
 *     summary: 'Actualiza un acceso de administrador'
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: Admin Access Username
 *     responses:
 *       200:
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
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Admin Access username xxx has been Updated
 *                 data:
 *                   type: string
 *                   example: AdminAccess
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
 *                   example: Body cannot be empty / Doesn't exist an Admin Access / Unauthorized
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
 *                   example: Admin Access cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
router.put('/admin-access/:id',checkAuth,validation(accessAdminPutValidation), putAdminAccess);

 /**
 * @openapi
 * /api/v1/admin-access/resetpass/:id:
 *   put:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Password reset for a Client-User No-Admin'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Client ID
 *     responses:
 *       200:
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
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: Client User Noadmin number xxx has Changed Password
 *                 data:
 *                   type: string
 *                   example: ClientUserNoAdmin
 *       400:
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
 *                   example: 400
 *                 msg:
 *                   type: string
 *                   example: Body cannot be empty / Don't exist a Client User No-Admin registered with id
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
 *                   example: Client User Noadmin cannot Change Password
 *                 data:
 *                   type: array
 *                   example: []
 */
  router.put('/admin-access/resetpass/:id',checkAuth,resetPass);

module.exports = router;
