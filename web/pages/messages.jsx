import React, { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client'
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

import { BASE_URL } from '../env'

export default function Messages () {
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [audio] = useState(typeof Audio !== "undefined" && new Audio('notification.mp3'));

    const handleMessage = (message) => {
        audio.play()
        setMessages(messages => [...messages, message])
    }

    const onSubmit = (e, message) => {
        socket.current.emit('msgToServer', message)
    }

    useEffect(() => {
        socket.current = io(BASE_URL);
        socket.current.on("message", (m) => handleMessage(m))
    }, [])

    return (
        <div className="md:pl-64 flex flex-col flex-1 ">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Messages</h1>
            {messages.map((message, index) => (
                <Message key={index} message={message}/>
            ))}
            <MessageInput onSubmit={onSubmit}/>
        </div>
    )
}