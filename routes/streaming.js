const { Router } = require("express");
const { videoReproduce, videoChunk } = require("../controllers/streaming");

const router = Router();

/**
 * @openapi
 * /api/v1/streaming:
 *   get:
 *     tags:
 *       - Streaming
 *     summary: 'Reproduce video por streaming'
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
router.get("/streaming", videoReproduce);
router.get("/video", videoChunk);

module.exports = router;
