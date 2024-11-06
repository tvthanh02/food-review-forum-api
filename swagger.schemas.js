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
 *     UserInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *     ResponseRegister:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         result:
 *           $ref: '#/components/schemas/UserInfo'
 */
