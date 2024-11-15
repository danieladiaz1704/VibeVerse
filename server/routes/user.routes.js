import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create);

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);


router.route('/api/users/:userId').get(userCtrl.read);
router.route('/api/users/:userId').put(userCtrl.update);
router.route('/api/users/:userId').delete(userCtrl.remove);


router.put('/api/users/follow/:userId', authCtrl.requireSignin, userCtrl.follow);
router.put('/api/users/unfollow/:userId', authCtrl.requireSignin, userCtrl.unfollow);


router.param('userId', userCtrl.userByID);

export default router;

