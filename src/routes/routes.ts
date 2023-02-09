import { Router } from 'express';
import {
  getUsers, getUserById, deleteUser,
  getPosts, getPostById, deletePost,
  getComments, getCommentById, deleteComment, getCommentsFromPost, 
  getTags, getTagById, deleteTag, getTagsPost, getPostsTag, DeleteTagToPost 
} from '../queries/queries';
import {
  createUserController, updateUserController, createPostController,
  updatePostController, createCommentController, updateCommentController,
  createTagController, updateTagController, addTagToPostController
} from '../controllers/controllers'

const router = Router();

router.route("/users").get(getUsers).post(createUserController);
router.route("/users/:user_id").get(getUserById).put(updateUserController).delete(deleteUser);
router.route("/posts").get(getPosts).post(createPostController);
router.route("/posts/:post_id").get(getPostById).put(updatePostController).delete(deletePost);
router.route("/comments").get(getComments).post(createCommentController);
router.route("/comments/:comment_id").get(getCommentById).put(updateCommentController).delete(deleteComment);
router.route("/posts/comments/:post_id").get(getCommentsFromPost);
router.route("/tags").get(getTags).post(createTagController);
router.route("/tags/:tag_id").get(getTagById).put(updateTagController).delete(deleteTag);
router.route("/posts/tags").post(addTagToPostController).delete(DeleteTagToPost);
router.route("/posts/tags/:post_id").get(getTagsPost);
router.route("/tags/posts/:tag_id").get(getPostsTag);

export { router };