const { Router } = require('express');

const { getOneClientUser, 
        getFilterClientUser,
        getClientsUser, 
        postClientUser, 
        putClientUser, 
        blockClientUser,
        deleteClientUser,
        resetPass } = require('../controllers/clientuser');
  
const { 
       clientUserValidation,
       clientUserPutValidation
       } = require('../validations/index.validations'); 

const { validation } = require('../middlewares/fieldsValidator');   
 
const { checkAuth } = require('../middlewares/checkAuth');
const { route } = require('./auth');

const router = Router();

/**
 * @openapi
 * /api/v1/client-user:
 *   post:
 *     tags:
 *       - Client User
 *     summary: 'Crea un cliente-usuario'
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
 *                   example: new ClientUser have been Created
 *                 data:
 *                   type: string
 *                   example: ClientUser
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
 *                   example: Email/Domain/Username is already in use
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
 *                   example: ClientUser cannot be Created
 *                 data:
 *                   type: array
 *                   example: []
 */
router.post('/client-user',validation(clientUserValidation),postClientUser);

/**
 * @openapi
 * /api/v1/client-user:
 *   get:
 *     tags:
 *       - Client User
 *     summary: 'Lista todos los clientes-usuarios'
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
 *                     example: ClientUser
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
 *                   example: ClientUser cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client-user',checkAuth,getClientsUser);

/**
 * @openapi
 * /api/v1/client-user-datatable:
 *   get:
 *     tags:
 *       - Client User
 *     summary: 'Lista los clientes-usuarios segun los filtros pasados por Body'
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
 *                     example: ClientUser
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
router.get('/client-user-datatables',checkAuth,getFilterClientUser);

/**
 * @openapi
 * /api/v1/client-user/:id:
 *   get:
 *     tags:
 *       - Client User
 *     summary: 'Obtiene un cliente-usuario por su ID'
 *     parameters:
 *       - in: body
 *         name: id
 *         schema:
 *           type: number
 *         description: Client User ID
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
 *                   example: ClientUser
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
 *                   example: Don't exist a ClientUser registered with id xxx
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
 *                   example: ClientUser cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client-user/:id',checkAuth,getOneClientUser);

/**
 * @openapi
 * /api/v1/client-user/:id:
 *   put:
 *     tags:
 *       - Client User
 *     summary: 'Actualiza un cliente-usuario'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Client User ID
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
 *                   example: ClientUser number xxx has been Updated
 *                 data:
 *                   type: string
 *                   example: ClientUser
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
 *                   example: Body cannot be empty / Id/Domain not exist
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
 *                   example: ClientUser cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
router.put('/client-user/:id',checkAuth,validation(clientUserPutValidation),putClientUser);

/**
 * @openapi
 * /api/v1/client-user/active/:id:
 *   put:
 *     tags:
 *       - Client User
 *     summary: 'Bloquea/Desbloquea un cliente-usuario'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Client User ID
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
 *                   example: ClientUser number xxx has been Blocked/Unblocked
 *                 data:
 *                   type: string
 *                   example: ClientUser
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
 *                   example: Body cannot be empty / Id not exist
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
 *                   example: ClientUser cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
 router.put('/client-user/active/:id',blockClientUser);

/**
 * @openapi
 * /api/v1/client-user/:id:
 *   delete:
 *     tags:
 *       - Client User
 *     summary: 'Elimina un cliente-usuario'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Client User ID
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
 *                   example: ClientUser number xxx has been Deleted
 *                 data:
 *                   type: string
 *                   example: ClientUser
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
 *                   example: Don't exist a ClientUser registered with id xxx
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
 *                   example: ClientUser cannot be Deleted
 *                 data:
 *                   type: array
 *                   example: []
 */
router.delete('/client-user/:id',checkAuth,deleteClientUser);

/**
 * @openapi
 * /api/v1/client-user/resetpass/:id:
 *   put:
 *     tags:
 *       - Client User
 *     summary: 'Password reset for a Client-User'
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Client User ID
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
 *                   example: ClientUser number xxx has Changed Password
 *                 data:
 *                   type: string
 *                   example: ClientUser
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
 *                   example: Body cannot be empty / Id not exist
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
 *                   example: ClientUser cannot Change Password
 *                 data:
 *                   type: array
 *                   example: []
 */
router.put('/client-user/resetpass/:id',checkAuth,resetPass);

module.exports = router;