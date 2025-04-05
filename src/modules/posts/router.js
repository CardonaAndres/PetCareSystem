import express from "express";
import * as PostController from './controller.js';

const router = express.Router();

router.get('/', PostController.getAllPosts); 
router.post('/', PostController.createPost);
router.put('/:post_ID', PostController.editPost);
router.delete('/:post_ID', PostController.deletePost);

export default router;