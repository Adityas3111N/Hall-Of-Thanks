import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

const PostCard = ({ $id, title, featuredimage }) => {
  return (
    <Link to={`Post/${$id}`} className="block">
      <div className='w-[350px] bg-gray-400 rounded-xl shadow-lg hover:shadow-gray-100 transition-shadow'>
        {/* Bigger Thumbnail with 16:9 Aspect Ratio */}
        <div className='w-full h-[200px] overflow-hidden rounded-xl'>
          <img 
            src={appwriteService.getFilePreview(featuredimage)} 
            alt={title} 
            className='w-full h-full object-cover'
          />
        </div>
        <div className='p-3'>
          <h2 className='text-base font-semibold line-clamp-2'>{title}</h2>
        </div>
        
      </div>
    </Link>
  );
};

export default PostCard;
