import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
import { motion, useAnimation } from 'framer-motion';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const InterviewSimulator = () => {
    const [messages, setMessages] = useState([]);
    const websocketRef = useRef(null);
    const email = localStorage.getItem('email');
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const messagesEndRef = useRef();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        websocketRef.current = new WebSocket(`ws://ayc-be.onrender.com/ws/${email}`);

        websocketRef.current.onmessage = (event) => {
            const serverMessage = event.data;
            setMessages(prevMessages => [...prevMessages, { sender: 'AI', text: serverMessage }]);
            speak(serverMessage);
            console.log("data", serverMessage);
        };
        websocketRef.current.onopen = () => {
            console.log("connected");
        };
        return () => {
            websocketRef.current.close();
        };
    }, [email]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        const userMessage = transcript;
        setMessages(prevMessages => [...prevMessages, { sender: 'User', text: userMessage }]);
        websocketRef.current.send(userMessage);
        resetTranscript();

    };

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    return (
        <div className="items-center grid grid-cols-2 gap-0 h-screen">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }} className='' >
                <color attach="background" args={["#ffffff"]} />
                <Experience />
            </Canvas>
            <div className="relative h-screen overflow-auto">
                <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                            Hello, Sadain
                        </h1>
                        <p className="mt-3 text-gray-600">
                            We are delighted to have you join this AI-powered interview.
                        </p>
                    </div>

                    <ul className="mt-16 space-y-5">
                        {messages.map((message, index) => (
                            <li key={index} className={`flex gap-x-2 sm:gap-x-4 ${message.sender === 'User' ? 'justify-end' : ''}`}>
                                {message.sender === 'AI' && (
                                    <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-primary">
                                        <span className="text-sm font-medium text-gray-900 leading-none">AI</span>
                                    </span>
                                )}
                                <div className={`bg-white border border-gray-200 rounded-lg p-4 space-y-3 ${message.sender === 'User' ? 'bg-gray-200' : ''}`}>
                                    <p className="text-sm text-gray-900">
                                        {message.text}
                                    </p>
                                </div>
                                {message.sender === 'User' && (
                                    <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-900">
                                        <span className="text-sm font-medium text-white leading-none">U</span>
                                    </span>
                                )}
                            </li>
                        ))}
                        <div ref={messagesEndRef} />
                    </ul>
                </div>

                <footer className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:mt-20 sm:pt-8 sm:pb-6 px-4 sm:px-6 lg:px-0">
                    <div className="flex justify-center items-center mb-3">
                        <button
                            type="button"
                            className="p-4 inline-flex justify-center items-center gap-x-1 rounded-lg bg-primary border border-transparent font-medium text-gray-900 focus:outline-none focus:ring-2 ring-offset-secondary focus:ring-white focus:ring-offset-2 text-xs"
                            onClick={listening ? stopListening : startListening}
                        >
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                            {listening ? 'Stop Answering' : 'Start Answering'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InterviewSimulator;
