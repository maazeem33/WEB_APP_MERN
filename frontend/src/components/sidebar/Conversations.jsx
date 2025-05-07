import React from 'react';
import Conversation from './Conversation.jsx';
import useGetConversations from '../../hooks/useGetConversations.js';

const Conversations = () => {
   const {loading,conversations}=useGetConversations();
   console.log("CONVERSATIONS:",conversations);

  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation,idx)=>(
        <Conversation
        key={conversation._id}
        conversation={conversation}
        lasstIdx={idx === conversations.length-1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span>: null}
    </div>
  );
};

export default Conversations;