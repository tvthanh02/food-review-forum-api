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
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         category_name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
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
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         position:
 *           type: string
 *         food_name:
 *           type: string
 *         user_id:
 *           type: string
 *           format: ObjectId
 *         province:
 *           type: string
 *         maps:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         description:
 *           type: string
 *         thumbnail:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *         hashtags:
 *           type: string
 *         status:
 *           type: string
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
