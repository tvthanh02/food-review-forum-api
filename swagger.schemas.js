/**
 * @openapi
 * components:
 *   schemas:
 *     RequestBodyLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: tvthanhcod@gmail.com
 *         password:
 *           type: string
 *     ResponseLogin:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */
