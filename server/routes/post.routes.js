import {Router} from 'express';
const router = Router();
import {createPost, deletePost, getAllPosts, getPostById, updatePost} from '../controllers/posts.controller.js';
import {verifyToken} from '../middlewares/index.js';

router.get('/', [verifyToken], getAllPosts);
router.post('/',verifyToken, createPost);
router.put('/:postId',verifyToken,  updatePost);
router.get('/:postId', verifyToken, getPostById);
router.delete('/:postId',verifyToken, deletePost);

export default router;