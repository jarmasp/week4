import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .required()
    .min(3)
    .max(30)
    .required()
});

const postSchema = Joi.object({
  user_id: Joi.number()
    .min(1)
    .required(),

  title: Joi.string()
    .required()
    .min(3)
    .max(20)
    .required(),
  
  body: Joi.string()
    .required()
    .min(10)
    .max(180)
    .required()
})

const commentSchema = Joi.object({ 
  user_id: Joi.number()
    .min(1)
    .required(),

  post_id: Joi.number()
    .min(1)
    .required(),

  body: Joi.string()
    .required()
    .min(2)
    .max(90)
    .required()
})

const tagSchema = Joi.object({
  tag: Joi.string().
    alphanum().
    min(3).
    max(10).
    required()
})

const postTagSchema = Joi.object({
  post_id: Joi.number()
    .min(1)
    .required(),
  
  tag_id: Joi.number()
    .min(1)
    .required()
})

export { userSchema, postSchema, commentSchema, tagSchema, postTagSchema };