import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const { user } = useUser();

    const addComment = async (e) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authToken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: comment
        }, { headers });
        const data = response.data;
        onArticleUpdated(data);
        setName('');
        setComment('');
    }

  return (
    <div className='add-comment-form'>
        <h3>Add Comment</h3>
        {user&&<p>You are posting as {user.email}</p>}
        <label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows="4" cols="50"/>
        </label>
        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm;