import express from 'express';
import TweetHttpHandler from '../handlers/prueba'

const router  = express.Router();

const tweetHttpHandler = new TweetHttpHandler();

router.get('/', tweetHttpHandler.getTweets);
router.get('/numerospares', tweetHttpHandler.getPares);
router.get('/:id', tweetHttpHandler.getTweetById);
router.put('/:id', tweetHttpHandler.updateTweet);
router.delete('/:id', tweetHttpHandler.deleteTweet);

export default router;