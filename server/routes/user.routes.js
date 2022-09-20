import {Router} from 'express';
const router = Router();
import {signUp, signIn, verifyToken} from '../controllers/users.controller.js';
import {verifyDuplicatedEmailOrUser} from '../middlewares/index.js';

router.post('/signUp', verifyDuplicatedEmailOrUser, signUp);
router.post('/signIn', signIn);
router.get('/verifyToken', verifyToken);

export default router;