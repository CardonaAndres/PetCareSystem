import express from "express";
import * as PostController from './controller.js';
import { checkRole } from "../../middlewares/checkRole.js";
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', PostController.getAllPosts); 
router.post('/', authMiddleware, checkRole([ 1 ]), PostController.createPost);
router.put('/:post_ID', authMiddleware, checkRole([ 1 ]), PostController.editPost);
router.delete('/:post_ID', authMiddleware, checkRole([ 1 ]), PostController.deletePost);

export default router;