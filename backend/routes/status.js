const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Estado del servidor
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Uptime del servidor, cantidad de requests y timestamp actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                 requests:
 *                   type: integer
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

router.get('/', (req, res) => {
    const uptime = process.uptime();
    const requests = req.app.get('requestCount') ?? 0;
    const timestamp = new Date().toISOString();
    res.json({ uptime, requests, timestamp })
});

module.exports = router;