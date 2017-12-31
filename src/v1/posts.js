import { Router } from 'express';
import _ from 'lodash';
import crud from 'services/resourceCrud';
import AuthenticationMiddleware from 'middleware/AuthenticationMiddleware';

export default ({ RequireAuthentication }) => {
  const router = new Router();
  return router
    .get('/', AuthenticationMiddleware.authenticate, (req, res) => {
      const posts = crud.get('posts', posts => posts.filter(post => {
        return (req.user || !post.hidden) && (!req.query.tag || _.includes(post.tags, req.query.tag));
      }));

      if (!posts) {
        return res.status(404).json({ message: 'Posts collection has not been found in the database' });
      }
      res.status(200).json(posts);
    })
    .get('/:id', AuthenticationMiddleware.authenticate, (req, res) => {
      const post = crud.getById('posts', req.params.id);

      if (!post || (!req.user && post.hidden)) {
        return res.status(404).json({ message: `Post not found` });
      }

      res.status(200).json(post);
    })
    .post('/', RequireAuthentication, (req, res) => {
      const post = crud.create('posts', req.body);

      res.status(200).json(post);
    })
    .put('/:id', RequireAuthentication, (req, res) => {
      const post = crud.replace('posts', req.params.id, req.body);

      if (!post) {
        return res.status(404).json({ message: `Post not found` });
      }

      res.status(200).json(post);
    })
    .patch('/:id', RequireAuthentication, (req, res) => {
      const post = crud.update('posts', req.params.id, req.body);

      if (!post) {
        return res.status(404).json({ message: `Post not found` });
      }

      res.status(200).json(post);
    })
    .delete('/:id', RequireAuthentication, (req, res) => {
      const post = crud.delete('posts', req.params.id);

      if (!post) {
        return res.status(404).json({ message: `Post not found` });
      }

      res.status(200).json(post);
    });
};
