import { pool } from '../configuration/dbconfig'
import express from 'express';

// Users queries

const getUsers = async (req: express.Request, res: express.Response) => {
  pool.query(
    'SELECT * FROM users ORDER BY user_id ASC',
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const getUserById = async (req: express.Request, res: express.Response) => {
  const user_id = parseInt(req.params.user_id )

  pool.query(
    'SELECT * FROM users WHERE user_id = $1',
    [user_id],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const createUser = async (req: express.Request, res: express.Response) => {
  const { username } = req.body

  pool.query(
    'INSERT INTO users (username) VALUES ($1) RETURNING *',
    [username],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with user_id: ${results.rows[0].user_id}`)
  })
}

const updateUser = async (req: express.Request, res: express.Response) => {
  const user_id  = parseInt(req.params.user_id)
  const { username } = req.body

  pool.query(
    'UPDATE users SET username = $1 WHERE user_id = $2', [
    username, user_id], 
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${user_id}`)
    }
  )
}

const deleteUser = async (req: express.Request, res: express.Response) => {
  const user_id  = parseInt(req.params.user_id )

  pool.query(
    'DELETE FROM users WHERE user_id = $1',
    [user_id],
    (error, results) => {
      if (error) {
        throw error
    }
    res.status(204).send(`User deleted with user_id: ${user_id}`)
  })
}

// Posts queries 

const getPosts = async (req: express.Request, res: express.Response) => {
  pool.query(
    'SELECT * FROM posts ORDER BY posted_on DESC',
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const getPostById = async (req: express.Request, res: express.Response) => {
  const post_id = parseInt(req.params.post_id)

  pool.query(
    'SELECT * FROM posts WHERE post_id = $1',
    [post_id],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const createPost = async (req: express.Request, res: express.Response) => {
  const { user_id, title, body } = req.body

  pool.query(
    'INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *',
    [parseInt(user_id), title, body],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(201).send(`post added with post_id: ${results.rows[0].post_id}`)
  })
}

const updatePost = async (req: express.Request, res: express.Response) => {
  const post_id = parseInt(req.params.post_id)
  const {title, body} = req.body

  pool.query(
    'UPDATE posts SET title = $1, body = $2  WHERE post_id = $3',
    [title, body, post_id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Post modified with ID: ${post_id}`)
    }
  )
}

const deletePost = async (req: express.Request, res: express.Response) => {
  const post_id = parseInt(req.params.post_id)

  pool.query(
    'DELETE FROM posts WHERE post_id = $1',
    [post_id],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(204).send(`Post deleted with post_id: ${post_id}`)
  })
}

// comments queries

const getComments = async (req: express.Request, res: express.Response) => {
  pool.query(
    'SELECT * FROM comments ORDER BY posted_on DESC',
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const getCommentById = async (req: express.Request, res: express.Response) => {
  const comment_id = parseInt(req.params.comment_id)

  pool.query(
    'SELECT * FROM comments WHERE comment_id = $1',
    [comment_id],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const createComment = async (req: express.Request, res: express.Response) => {
  const { user_id, post_id, body } = req.body

  pool.query(
    'INSERT INTO comments (user_id, post_id, body) VALUES ($1, $2, $3) RETURNING *',
    [parseInt(user_id), parseInt(post_id), body],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(201).send(`post added with post_id: ${results.rows[0].comment_id}`)
  })
}

const updateComment = async (req: express.Request, res: express.Response) => {
  const comment_id = parseInt(req.params.comment_id)
  const { body}  = req.body

  pool.query(
    'UPDATE comments SET body = $1  WHERE comment_id = $2',
    [body, comment_id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Comment modified with comment_id: ${comment_id}`)
    }
  )
}

const deleteComment = async (req: express.Request, res: express.Response) => {
  const comment_id = parseInt(req.params.comment_id)

  pool.query('DELETE FROM comments WHERE comment_id = $1',
    [comment_id],
    (error, results) => {
      if (error) {
        throw error
      }
    res.status(204).send(`Comment deleted with comment_id: ${comment_id}`)
  })
}

const getCommentsFromPost = async (req: express.Request, res: express.Response) => {
  const post_id = parseInt(req.params.post_id)

  pool.query(`SELECT *
  FROM posts p
  INNER JOIN comments c ON c.post_id = p.post_id
  WHERE p.post_id = $1`,
  [post_id],
  (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// tags queries

const getTags = async (req: express.Request, res: express.Response) => {
  pool.query(
    'SELECT * FROM tags ORDER BY tag_id ASC',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
  })
}

const getTagById = async (req: express.Request, res: express.Response) => {
  const tag_id = parseInt(req.params.tag_id)

  pool.query('SELECT * FROM tags WHERE tag_id = $1',
    [tag_id],
    (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createTag = async (req: express.Request, res: express.Response) => {
  const { tag } = req.body
  
  pool.query(
    'INSERT INTO tags (tag) VALUES ($1) RETURNING *',
    [tag],
    (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Tag added with tag_id: ${results.rows[0].tag_id}`)
  })
}

const updateTag = async (req: express.Request, res: express.Response) => {
  const tag_id = parseInt(req.params.tag_id)
  const { tag } = req.body

  pool.query(
    'UPDATE tags SET tag = $1  WHERE tag_id = $2',
    [tag, tag_id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Comment modified with tag_id: ${tag_id}`)
    }
  )
}

const deleteTag = async (req: express.Request, res: express.Response) => {
  const tag_id  = parseInt(req.params.tag_id )

  pool.query(
    'DELETE FROM tags WHERE tag_id = $1',
    [tag_id],
    (error, results) => {
      if (error) {
        throw error
    }
    res.status(204).send(`Tag deleted with tag_id: ${tag_id}`)
  })
}

const addTagToPost = async (req: express.Request, res: express.Response) => {
  const { post_id, tag_id,  } = req.body
  
  pool.query(
    'INSERT INTO post_tag (post_id, tag_id) VALUES ($1, $2) RETURNING *', 
    [parseInt(post_id), parseInt(tag_id)],
    (error, results) => {
      if (error) {
        throw error
    }
    res.status(201).send(`Added with tag_id: ${tag_id} to post: ${post_id}`)
  })
}

const getTagsPost = async (req: express.Request, res: express.Response) => {
  const post_id = req.params.post_id
  
  pool.query(
    `SELECT * 
    FROM posts p
    INNER JOIN post_tag pt ON p.post_id = pt.post_id
    INNER JOIN tags t ON t.tag_id = pt.tag_id
    WHERE p.post_id = $1`, 
    [parseInt(post_id)],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
  })
}

const getPostsTag = async (req: express.Request, res: express.Response) => {
  const tag_id = req.params.tag_id
  
  pool.query(
    `SELECT * FROM tags t
    INNER JOIN post_tag pt ON t.tag_id = pt.tag_id
    INNER JOIN posts p ON p.post_id = pt.post_id
    WHERE t.tag_id = $1`, 
    [parseInt(tag_id)],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
  })
}

const DeleteTagToPost = async (req: express.Request, res: express.Response) => {
  const { tag_id, post_id } = req.body
  
  pool.query(
    'DELETE FROM post_tag WHERE tag_id = $1 AND post_id = $2', 
    [parseInt(tag_id), parseInt(post_id)],
    (error, results) => {
      if (error) {
        throw error
    }
    res.status(204).send(`Added with tag_id: ${tag_id} to post: ${post_id}`)
  })
}

export {
  getUsers, getUserById, createUser, updateUser, deleteUser,
  getPosts, getPostById, createPost, updatePost, deletePost,
  getComments, getCommentById, createComment, updateComment, deleteComment, getCommentsFromPost, 
  getTags, getTagById, createTag, updateTag, deleteTag, addTagToPost, getTagsPost, getPostsTag, DeleteTagToPost 
}