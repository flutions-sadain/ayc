import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import Experience from './Experience';
import { motion, useAnimation } from 'framer-motion';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { IoMicOutline } from "react-icons/io5";
import { FaRegStopCircle } from "react-icons/fa";
import { Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const InterviewSimulator = () => {
    const [messages, setMessages] = useState([]);
    const websocketRef = useRef(null);
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const messagesEndRef = useRef();
    const [animation, setAnimation] = useState("Idle");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [interviewEnded, setInterviewEnded] = useState(false);

    // console.log("name", fullName);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // websocketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/${email}`);
        websocketRef.current = new WebSocket(`wss://ayc-be.onrender.com/ws/${email}`);

        websocketRef.current.onopen = () => {
            // console.log("connected");
            setLoading(false);
        };

        websocketRef.current.onmessage = (event) => {
            const serverMessage = event.data;
            setMessages(prevMessages => [...prevMessages, { sender: 'AI', text: serverMessage }]);
            speak(serverMessage);
            // console.log("data", serverMessage);

            if (serverMessage === "Interview has ended. Thank you!") {
                setInterviewEnded(true);
            }
        };

        return () => {
            websocketRef.current.close();
        };
    }, [email]);

    // console.log("message", messages);

    useEffect(() => {
        scrollToBottom();
        if (messages.length > 0 && messages[messages.length - 1].sender === 'AI') {
            setAnimation("Talking");
            setIsSpeaking(true);
        }
    }, [messages]);

    useEffect(() => {
        if (!isSpeaking) {
            setAnimation("Idle");
        }
    }, [isSpeaking]);


    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        SpeechRecognition.abortListening();
        const userMessage = transcript;
        setMessages(prevMessages => [...prevMessages, { sender: 'User', text: userMessage }]);
        websocketRef.current.send(userMessage);
        resetTranscript();

    };

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            setIsSpeaking(false);
        };
        synth.speak(utterance);
    };

    const handleProceedToReport = () => {
        navigate("/interview?id=new");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner color="secondary" size="lg" />
            </div>
        );
    }

    return (
        <div className="items-center grid grid-cols-2 gap-0 h-screen">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }} className='' >
                <color attach="background" args={["#ffffff"]} />
                <Experience animation={animation} />
            </Canvas>
            <div className="relative h-screen overflow-auto">
                <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                            Hello, {fullName}
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
                    <div className="flex justify-end items-center mb-3 gap-52 mr-4">
                        <button
                            type="button"
                            className="p-4 inline-flex justify-center items-center gap-x-1 rounded-lg bg-primary border border-transparent font-medium text-gray-900 focus:outline-none focus:ring-2 ring-offset-secondary focus:ring-white focus:ring-offset-2 text-xs"
                            onClick={listening ? stopListening : startListening}
                        >
                            {listening ? <FaRegStopCircle className="flex-shrink-0 size-5" /> : <IoMicOutline className="flex-shrink-0 size-5" />}
                            {listening ? 'Stop Answering' : 'Start Answering'}
                        </button>
                        <button
                            type="button"
                            className="p-4 inline-flex justify-center items-center gap-x-1 rounded-lg bg-gray-900 border border-transparent font-medium text-white focus:outline-none focus:ring-2 ring-offset-secondary focus:ring-white focus:ring-offset-2 text-xs"
                            onClick={handleProceedToReport}
                        >
                            {interviewEnded ? 'Proceed to report' : 'End Interview'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InterviewSimulator;
