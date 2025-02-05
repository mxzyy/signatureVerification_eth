'use client'
import { useState } from "react";


function Form() {
    const [message, setMessage] = useState('');
    const [hash, setHash]       = useState('');
    
    const handleMessageChange = (event) => {
        setMessage(event.target.value); 
    };
    const handleHashChange = (event) => {
        setHash(event.target.value); 
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Message:', message); 
    };
    const handleHashSubmit = (event) => {
        event.preventDefault();
        console.log('Hash :', hash);
    };

    return (
        <>
            <div className="flex gap-5 justify-center items-center mt-10">
                <form className="px-10 w-96" onSubmit={handleSubmit} >
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Message to Hash
                    </label>
                    <textarea
                        id="message"
                        rows="6" 
                        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32" // Menambah tinggi
                        placeholder="Message..."
                        value={message}
                        onChange={handleMessageChange}
                    ></textarea>
                    <button
                        className="mt-8 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                <form className="px-10 w-96" onSubmit={handleHashSubmit}>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Hash to verify Signature
                    </label>
                    <textarea
                        id="message"
                        rows="6" // Menambah jumlah baris
                        className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32" // Menambah tinggi
                        placeholder="Hash..."
                        onChange={handleHashChange}
                    ></textarea>
                    <button
                        className="mt-8 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form;