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
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         avatar:
 *           type: string
 *         user_name:
 *           type: string
 *         social_links:
 *           type: array
 *           items:
 *             type: string
 *         bio:
 *           type: string
 *     Meta:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *         currentPage:
 *           type: number
 *         totalPages:
 *           type: number
 *     ResponseRegister:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         result:
 *           $ref: '#/components/schemas/UserInfo'
 */
