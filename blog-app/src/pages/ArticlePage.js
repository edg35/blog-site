import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ votes: 0, comments: [] });
  const { articleId } = useParams();

  const {user, isloading} = useUser();

  useEffect(() => {
    const loadArticle = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const data = response.data;
      setArticleInfo(data);
    }

    loadArticle();
  }, [articleId]);

  const article = articles.find(article => article.name === articleId);

  const upvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const data = response.data;
        setArticleInfo(data);
  }

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
      {user 
        ? <button onClick={upvote}>Upvote</button>
        : <button>Login to upvote</button>
      }
        <p>This article has {articleInfo.votes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user 
        ? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        : <button>Login to comment</button>
      }
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}
export default ArticlePage;