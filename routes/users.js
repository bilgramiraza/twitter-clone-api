const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { 
  loginValidation,
  registerValidation, 
  modifyUserValidation, 
  authMiddleware
} = require('../middlewares/validation');

/*user API Routes*/
router.post('/', loginValidation, userController.login);
router.post('/register', registerValidation, userController.register);

router.get('/me', authMiddleware, userController.currentUser);
router.patch('/me', authMiddleware, modifyUserValidation, userController.modifyUser);
router.delete('/me', authMiddleware, userController.deleteUser);

router.get('/:username', authMiddleware, userController.getUser);

router.get('/me/friends', authMiddleware, userController.getFriends);
router.delete('/me/friends/:userId', authMiddleware,  userController.removeFriend);

router.get('/me/friend-request', authMiddleware,  userController.getFriendRequests);
router.post('/me/friend-request/:userId', authMiddleware,  userController.sendFriendRequest);
router.patch('/me/friend-request/:userId', authMiddleware,  userController.acceptFriendRequest);
router.delete('/me/friend-request/:userId', authMiddleware,  userController.declineFriendRequest);

module.exports = router;
