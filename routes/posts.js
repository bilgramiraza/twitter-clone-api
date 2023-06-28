const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { authMiddleware } = require('../middlewares/validation');

router.use(authMiddleware);

/*Post API Routes*/
router.get('/', postController.allPosts);
router.get('/friends', postController.friendsPosts);

router.get('/:postId', postController.singlePost);

router.post('/', postController.createPost);
router.post('/:postId', postController.createCommentPost);

router.patch('/:postId', postController.modifyPost);

router.delete('/:postId', postController.deletePost);

module.exports = router;
