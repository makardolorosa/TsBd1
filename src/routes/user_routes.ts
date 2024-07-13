import * as express from 'express';

import { all, one, remove, save } from '@/domain/user/user.controller';
import { protectedRoute } from '@/midlewares/auth.midleware';

export const userRouter = express.Router();

userRouter.route('').get(all).post(save);
userRouter.route('/:id').get(protectedRoute, one).delete(remove);
