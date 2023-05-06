import express from "express";

let articlesInfo = [{
  name: "learn-react",
  votes: 0,
  comments: [],
}, {
  name: "learn-node",
  votes: 0,
  comments: [],
}, {
  name: "mongodb",
  votes: 0,
  comments: [],
}
];

const app = express();
app.use(express.json());

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

