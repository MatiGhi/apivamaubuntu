const { Router } = require('express');

const { getOneClient, 
        getClients,
        getFilterClient, 
        postClient, 
        putClient, 
        blockClient,
        deleteClient} = require('../controllers/client');

 //Schema Validators       
 const { 
        clientValidation,
        clientPutValidation
    } = require('../validations/index.validations'); 

 //Middleware Body Validator 
 const { validation } = require('../middlewares/fieldsValidator');    
 
 const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

/**
 * @openapi
 * /api/v1/client:
 *   post:
 *     tags:
 *       - Client
 *     summary: 'Crea un cliente'
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
 *                   example: new Client and Client User have been Created
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Client, ClientUser
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
 *                   example: Client cannot be Created
 *                 data:
 *                   type: array
 *                   example: []
 */
router.post('/client',validation(clientValidation),postClient);

/**
 * @openapi
 * /api/v1/client:
 *   get:
 *     tags:
 *       - Client
 *     summary: 'Lista todos los clientes'
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
 *                     example: Client
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
 *                   example: Clients cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client',checkAuth,getClients);

/**
 * @openapi
 * /api/v1/client-datatable:
 *   get:
 *     tags:
 *       - Client
 *     summary: 'Lista los Clientes segun los filtros pasados por Body'
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
 router.get('/client-datatables',checkAuth,getFilterClient);

/**
 * @openapi
 * /api/v1/client/:id:
 *   get:
 *     tags:
 *       - Client
 *     summary: 'Obtiene un cliente por su ID'
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
 *                   example: Data retrieved Successfully
 *                 data:
 *                   type: string
 *                   example: Client
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
 *                   example: Don't exist a Client registered with id xxx
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
 *                   example: Clients cannot been retrieved
 *                 data:
 *                   type: array
 *                   example: []
 */
router.get('/client/:id',checkAuth,getOneClient);

/**
 * @openapi
 * /api/v1/client/:id:
 *   put:
 *     tags:
 *       - Client
 *     summary: 'Actualiza un cliente'
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
 *                   example: Client number xxx has been Updated
 *                 data:
 *                   type: string
 *                   example: Client
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
 *                   example: Client cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
router.put('/client/:id',checkAuth,validation(clientPutValidation),putClient);

/**
 * @openapi
 * /api/v1/client/active/:id:
 *   put:
 *     tags:
 *       - Client
 *     summary: 'Bloquea/Desbloquea un cliente'
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
 *                   example: Client number xxx has been Blocked/Unblocked
 *                 data:
 *                   type: string
 *                   example: Client
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
 *                   example: Client cannot be Updated
 *                 data:
 *                   type: array
 *                   example: []
 */
 router.put('/client/active/:id', checkAuth, blockClient);

/**
 * @openapi
 * /api/v1/client/:id:
 *   delete:
 *     tags:
 *       - Client
 *     summary: 'Elimina un cliente'
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
 *                   example: Client number xxx has been Deleted
 *                 data:
 *                   type: string
 *                   example: Client
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
 *                   example: Don't exist a Client registered with id xxx
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
 *                   example: Client cannot be Deleted
 *                 data:
 *                   type: array
 *                   example: []
 */
router.delete('/client/:id',checkAuth,deleteClient);

module.exports = router;