import React from 'react';
import { format, parseISO } from 'date-fns';

function CommentCard({ author, avatarUrl, date, text }) {
  const dateObject = parseISO(date);
  const formattedDate = format(dateObject, 'd MMMM yyyy \'at\' HH:mm');
  return (
    <div className="">
      <div className="flex items-center mb-4 mx-2">
        <img src={avatarUrl || null} alt="author"
        className="w-12 h-12 rounded-full mr-2 object-cover" />
        <div className="flex flex-col">
          <span className="font-bold text-md text-gray-800">{author}</span>
          <span className="text-xs text-gray-500" >{formattedDate}</span>
        </div>
      </div>
      <p className="text-md text-gray-700 leading-relaxed mb-10" style={{ whiteSpace: 'pre-line'}}>{text}</p>
    </div>
  );
}

export default CommentCard;
