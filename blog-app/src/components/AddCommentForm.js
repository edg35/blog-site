import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const addComment = async (e) => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: comment
        });
        const data = response.data;
        onArticleUpdated(data);
        setName('');
        setComment('');
    }

  return (
    <div className='add-comment-form'>
        <h3>Add Comment</h3>
        <label>
            Name
            <input value={name} onChange={e => setName(e.target.value)} type='text' />
        </label>
        <label>
            Comment:
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows="4" cols="50"/>
        </label>
        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm;