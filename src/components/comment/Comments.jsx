import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, deleteComment } from '../../features/commentSlice.js';
import { formatDistanceToNow } from 'date-fns';

function Comments({ postId }) {
    const dispatch = useDispatch();
    const { comments, loading } = useSelector(state => state.comments);
    const user = useSelector(state => state.auth.userData) || {};
    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            dispatch(addComment({ postId, userId: user?.userData?.$id, content, userName: user?.userData?.name }));
            setContent('');
        }
    };

    const getTimeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
            {loading && <p className="text-gray-500">Loading comments...</p>}

            {/* Comment Input Box */}
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition cursor-pointer">
                    Post Comment
                </button>
            </form>

            {/* Display Comments */}
            <div className="mt-6 space-y-4">
                {comments
                    ?.slice()
                    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                    .map(comment => (
                        <div key={comment.$id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-900 font-medium">{comment.content}</p>
                            <div className="text-sm text-gray-500 mt-1 flex items-center justify-between">
                                <span>By: <span className="font-semibold text-gray-700">{comment.userName || "Anonymous"}</span> • {getTimeAgo(comment.$createdAt)}</span>
                                {user?.userData?.$id === comment.userId && (
                                    <button onClick={() => dispatch(deleteComment(comment.$id))}
                                        className="text-red-500 hover:text-red-600 font-medium cursor-pointer">
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Comments;
