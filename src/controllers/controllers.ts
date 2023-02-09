import {
createUser, updateUser, createPost, updatePost, createComment, updateComment, createTag, updateTag, addTagToPost
} from '../queries/queries';
import { userSchema, postSchema, commentSchema, tagSchema, postTagSchema } from '../lib/schemas';
import express from 'express';

const createUserController = async (req: express.Request, res: express.Response) => {
  const result = userSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return createUser(req, res)
}

const updateUserController = async (req: express.Request, res: express.Response) => {
  const result = userSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return updateUser(req, res)
}

const createPostController = async (req: express.Request, res: express.Response) => {
  const result = postSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return createPost(req, res)
}

const updatePostController = async (req: express.Request, res: express.Response) => {
  const result = postSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return updatePost(req, res)
}

const createCommentController = async (req: express.Request, res: express.Response) => {
  const result = commentSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return createComment(req, res)
}

const updateCommentController = async (req: express.Request, res: express.Response) => {
  const result = commentSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return updateComment(req, res)
}

const createTagController = async (req: express.Request, res: express.Response) => {
  const result = tagSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return createTag(req, res)
}

const updateTagController = async (req: express.Request, res: express.Response) => {
  const result = tagSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return updateTag(req, res)
}

const addTagToPostController = async (req: express.Request, res: express.Response) => {
  const result = postTagSchema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  } 
  return addTagToPost(req, res)
}

export {
  createUserController, updateUserController, createPostController,
  updatePostController, createCommentController, updateCommentController,
  createTagController, updateTagController, addTagToPostController
}

