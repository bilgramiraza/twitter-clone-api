const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { loginValidation, registerValidation} = require('../middlewares/validation');

/*user API Routes*/
router.post('/', loginValidation, userController.login);
router.post('/register', registerValidation, userController.register);
router.post('/logout', userController.logout);

router.get('/me', userController.currentUser);
router.patch('/me', userController.modifyUser);
router.delete('/me', userController.deleteUser);

router.get('/:username', userController.getUser);

router.get('/friends', userController.getFriends);
router.delete('/friends/:userId', userController.removeFriend);

router.get('/friend-request', userController.getFriendRequests);
router.post('/friend-request/:userId', userController.sendFriendRequest);
router.patch('/friend-request/:userId', userController.acceptFriendRequest);
router.delete('/friend-request/:userId', userController.declineFriendRequest);

module.exports = router;
