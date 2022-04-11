import React, { useRef, useEffect, useState } from 'react';
import './ChatroomStyles/chatroom.css';
import { FiSend } from 'react-icons/fi';
import { useUserAuth } from '../../context/UserAuthContext';
import db from '../../config/firebase';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import ChatMessage from './ChatMessage';

const ChatRoom = () => {
  const { user, logOut } = useUserAuth();

  const [messages, setMessages] = useState([]);
  const lastMsg = useRef();
  const messageCollection = collection(db, 'messages');

  const curMessageData = query(
    messageCollection,
    orderBy('createdAt'),
    limit(25)
  );

  const { uid, photoURL } = user;

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {}
  };

  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: 'smooth' });

    onSnapshot(curMessageData, (snapshot) => {
      let messages = [];
      snapshot.docs.forEach((doc) => {
        //setMessages([...messages, doc.data()]);
        messages.push(doc.data());
      });
      setMessages(messages);
    });
  }, []);

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(messageCollection, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    lastMsg.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className='chatroom'>
        <header>
          <button className='sign-out' onClick={handleLogout}>
            Log Off
          </button>
        </header>
        <div className='chatroom-display'>
          <div className='chatroom-menu'>
            <div className='menu-users'></div>
          </div>
          <div className='chatroom-main'>
            <div className='message-feed'>
              {messages &&
                messages.map((msg) => {
                  return (
                    <ChatMessage key={msg.id} message={msg} currentUser={uid} />
                  );
                })}
              <span ref={lastMsg}></span>
            </div>
            <form onSubmit={sendMessage} className='message-submit'>
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder='Send Message...'
              />

              <button type='submit' disabled={!formValue}>
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
