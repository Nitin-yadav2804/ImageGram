import express from 'express';

import postRouter from './post.js';
import userRouter from './user.js';

const router = express.Router();

router.use("/posts", postRouter); // If in the remaining url i.e. after /api, we have the url starting with /posts. then the request is forwarded to postRouter

router.use("/users", userRouter); // If in the remaining url i.e. after /api, we have the url starting with /users. then the request is forwarded to userRouter

export default router;
