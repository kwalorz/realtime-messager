const ChatMessage = ({ message, currentUser }) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === currentUser ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        {/* <img
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        /> */}
        <p>{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;
