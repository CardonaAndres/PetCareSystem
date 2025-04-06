import express from "express";
import * as PostController from './controller.js';
import { checkRole } from "../../middlewares/checkRole.js";

const router = express.Router();

router.get('/', PostController.getAllPosts); 
router.post('/', checkRole([ 1 ]), PostController.createPost);
router.put('/:post_ID', checkRole([ 1 ]), PostController.editPost);
router.delete('/:post_ID', checkRole([ 1 ]), PostController.deletePost);

export default router;