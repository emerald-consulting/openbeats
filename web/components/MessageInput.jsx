import { useState } from "react";

const MessageInput = ({onSubmit}) => {
    const [message, setMessage] = useState("")
    const submit = (e) => onSubmit(e, message)

    const handleMessageChange = (e) => setMessage(e.target.value);

  return (
    <div className="align-items-center text-center mr-20">
      <input onChange={handleMessageChange} className="w-1/2" type="text" placeholder="Send message..." />
      <button
        onClick={submit}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Submit
      </button>
    </div>
  );
};

export default MessageInput;
