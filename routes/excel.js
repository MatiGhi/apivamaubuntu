const { Router } = require("express");
const { excel } = require("../controllers/excel");

const router = Router();

/**
 * @openapi
 * /api/v1/excel:
 *   post:
 *     tags:
 *       - Excel
 *     summary: 'Exporta un Archivo Excel'
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
router.get('/excel', excel);

module.exports = router;
