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
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: logged in
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *     UserInfo:
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
 *         role:
 *           type: string
 *           enum: ["admin", "user", "subadmin"]
 *         isLock:
 *           type: boolean
 *         subadmin_status:
 *           type: string
 *           enum: ['Active', 'Pending', 'Suspended', 'Rejected']
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
 *         status:
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
 *         status:
 *           type: string
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
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
 *     PostBody:
 *       type: object
 *       properties:
 *         position:
 *           type: string
 *         food_name:
 *           type: string
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
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *     Rate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         rate:
 *           type: number
 *         post_id:
 *           type: string
 *           format: ObjectId
 *         user_id:
 *           type: string
 *           format: ObjectId
 *         user_info:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user_name:
 *               type: string
 *             avatar:
 *               type: string
 *             email:
 *               type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         content:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *         post_id:
 *           type: string
 *           format: ObjectId
 *         user_id:
 *           type: string
 *           format: ObjectId
 *         parent_id:
 *           type: string
 *           format: ObjectId
 *         reply_to_user_id:
 *           type: string
 *           format: ObjectId
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user_name:
 *               type: string
 *             avatar:
 *               type: string
 *         reply_to_user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user_name:
 *               type: string
 *             avatar:
 *               type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ResponseReport:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         note:
 *           type: string
 *         post:
 *           $ref: '#/components/schemas/Post'
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             user_name:
 *               type: string
 *             avatar:
 *               type: string
 *         report_content:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ResponseErrorInternalServer:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         errors:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 500
 *             title:
 *               type: string
 *               example: Internal Server Error
 *             detail:
 *               type: string
 *               example: Internal Server Error
 *             source:
 *               type: string
 *               example: /path/
 *     ResponseErrorBadRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         errors:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 400
 *             title:
 *               type: string
 *               example: Bad Request
 *             detail:
 *               type: string
 *               example: Invalid anything
 *             source:
 *               type: string
 *               example: /path/
 *     ResponseErrorNotFound:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         errors:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 404
 *             title:
 *               type: string
 *               example: Not Found
 *             detail:
 *               type: string
 *               example: Not Found
 *             source:
 *               type: string
 *               example: /path/
 *     ResponseErrorUnauthorized:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         errors:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 401
 *             title:
 *               type: string
 *               example: Unauthorized
 *             detail:
 *               type: string
 *               example: Unauthorized
 *             source:
 *               type: string
 *               example: /path/
 *     ResponseErrorForbidden:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         errors:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 403
 *             title:
 *               type: string
 *               example: Forbidden
 *             detail:
 *               type: string
 *               example: Forbidden
 *             source:
 *               type: string
 *               example: /path/
 */
