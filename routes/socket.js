const { Router } = require("express");
const { socket } = require("../controllers/socket");

const router = Router();

/**
 * @openapi
 * /api/v1/socket:
 *   get:
 *     tags:
 *       - Socket
 *     summary: 'Chat en directo por socket.io'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: file
 *                   example: html
 */
router.get("/socket", socket);

module.exports = router;
