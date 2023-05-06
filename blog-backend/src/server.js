import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

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

app.post('/api/articles/:name/comments', (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;

  const article = articlesInfo.find(article => article.name === name);

  if(article) {
    article.comments.push({postedBy, text});
    res.send(article.comments);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }

});

app.put('/api/articles/:name/upvote', (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find(article => article.name === name);
  if (article){
    article.votes += 1;
    res.send(`Article ${name} upvoted: ${article.votes}!!!`);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

