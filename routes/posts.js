const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { authMiddleware, postValidation, postIdValidation } = require('../middlewares/validation');

router.use(authMiddleware);

/*Post API Routes*/
router.get('/', postController.allPosts);
router.get('/me', postController.currentUserPosts);
router.get('/friends', postController.friendsPosts);

router.get('/:postId', postController.singlePost);

router.post('/', postValidation, postController.createPost);
router.post('/:postId', postIdValidation, postValidation, postController.createCommentPost);

router.patch('/:postId', postIdValidation, postValidation, postController.modifyPost);

router.delete('/:postId', postIdValidation, postController.deletePost);

module.exports = router;
