import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

app.post('/api/articles/newarticle', async (req, res) => {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('react-blog-db');
  
  await db.collection('articles').insertOne(req.body);
  const article = await db.collection('articles').findOne({name: req.body.name});

  if(article) {
      res.send(`${article} added to database`);
    } else {
      res.status(404).json({ message: 'unable to add article'});
    }

});

app.get('/api/articles/:name', async (req, res) => { 
  const { name } = req.params;

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();

  const db = client.db('react-blog-db');
  const article = await db.collection('articles').findOne({name});

  if(article) {
    res.send(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }

  res.json(article);

});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;

  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('react-blog-db');

  await db.collection('articles').updateOne({ name }, {$push: {comments: {postedBy, text}}});
  const article = await db.collection('articles').findOne({ name });

  if(article) {
    res.send(article.comments);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }

});

app.put('/api/articles/:name/upvote', async (req, res) => {
 
  const { name } = req.params;

  const mongodbClient = new MongoClient('mongodb://127.0.0.1:27017');
  await mongodbClient.connect();

  const db = mongodbClient.db('react-blog-db');
  await db.collection('articles').updateOne({ name }, {$inc: {votes: 1}});
  const article = await db.collection('articles').findOne({ name });

  if (article){
    res.send(`Article ${name} upvoted: ${article.votes}!!!`);
  } else {
    res.status(404).json({ message: 'Article not found!' });
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 3000!");
});
