import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ votes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const data = response.data;
      setArticleInfo(data);
    }

    loadArticle();
  }, [articleId]);

  const article = articles.find(article => article.name === articleId);

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.votes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  )
}
export default ArticlePage;