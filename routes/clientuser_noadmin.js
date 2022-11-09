const { Router } = require('express');

const { getClientsUserNoAdmin,
        getFilterClientUserNoAdmin,
        getOneClientUserNoAdmin,
        postClientUserNoAdmin,
        putClientUserNoAdmin,
        blockClientUserNoAdmin,
        deleteClientUserNoAdmin,
        resetPass 
    } = require('../controllers/clientuser_noadmin');

 //Schema Validators       
 const { 
    clientUserNoAdminValidation,
    clientUserNoAdminPutValidation
    } = require('../validations/index.validations'); 

//JWT Validator
const { validation } = require('../middlewares/fieldsValidator');      

const { checkAuth } = require('../middlewares/checkAuth');
const { route } = require('./auth');

const router = Router();

/**
 * @openapi
 * /api/v1/client-user-noadmin:
 *   get:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Lista todos los clientes-usuarios-noadmin'
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
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ClientUserNoAdmin
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
 *                   example: ClientUserNoAdmin cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client-user-noadmin',checkAuth, getClientsUserNoAdmin);

/**
 * @openapi
 * /api/v1/client-user-noadmin-datatables:
 *   get:
 *     tags:
 *       - Client User NoAdmin
 *     summary: 'Lista los clientes-usuarios no-administradores segun los filtros pasados por Body'
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
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ClientUser-NoAdmin
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
 *                   example: data cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client-user-noadmin-datatables',checkAuth, getFilterClientUserNoAdmin);

/**
 * @openapi
 * /api/v1/client-user-noadmin/:id:
 *   get:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Obtiene un cliente-usuario-noadmin por su ID'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: ClientUserNoAdmin ID
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
 *                   example: Don't exist a Client User NoAdmin registered with id xxx
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
 *                   example: Client User NoAdmin cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client-user-noadmin/:id',checkAuth, getOneClientUserNoAdmin);

/**
 * @openapi
 * /api/v1/client-user-noadmin:
 *   post:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Crea un cliente-usuario-noadmin'
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
 *                   example: new ClientUserNoAdmin have been Created
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
 *                   example: Email is already in use
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
 *                   example: Client User Noadmin cannot be Created
 *                 data:
 *                   type: array
 *                   example: []
 */
 router.post('/client-user-noadmin',validation(clientUserNoAdminValidation),postClientUserNoAdmin);

/**
 * @openapi
 * /api/v1/client-user-noadmin/:id:
 *   put:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Actualiza un cliente-usuario-noadmin'
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
 *                   example: Client User Noadmin number xxx has been Updated
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
 *                   example: Body cannot be empty / Doesn't exist a Client User registered with id
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
 *                   example: Client User Noadmin cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
router.put('/client-user-noadmin/:id',checkAuth, validation(clientUserNoAdminPutValidation),putClientUserNoAdmin);

/**
 * @openapi
 * /api/v1/client-user-noadmin/active/:id:
 *   put:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Bloquea/Desbloquea un cliente-usuario-noadmin'
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
 *                   example: Client User Noadmin number xxx has been Blocked/Unblocked
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
 *                   example: Body cannot be empty / Don't exist a Client User registered with id
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
 *                   example: Client User Noadmin cannot be Blocked/Unblocked
 *                 data:
 *                   type: array
 *                   example: []
 */
 router.put('/client-user-noadmin/active/:id',checkAuth,blockClientUserNoAdmin);

 /**
 * @openapi
 * /api/v1/client-user-noadmin/resetpass/:id:
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
 router.put('/client-user-noadmin/resetpass/:id',checkAuth,resetPass);

/**
 * @openapi
 * /api/v1/client-user-noadmin/:id:
 *   delete:
 *     tags:
 *       - Client User Noadmin
 *     summary: 'Elimina un cliente-usuario-noadmin'
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
 *                   example: Client User no Admin number xxx has been Deleted
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
 *                   example: Doesn't exist a Client User no Admin registered with id xxx
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
 *                   example: Client User no Admin cannot be Deleted
 *                 data:
 *                   type: array
 *                   example: []
 */
router.delete('/client-user-noadmin/:id',checkAuth,deleteClientUserNoAdmin);

module.exports = router;