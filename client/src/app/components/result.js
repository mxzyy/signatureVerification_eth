import ClipboardJS from "clipboard";
import { useEffect, useRef } from "react";

function Result({ result, verifyResult }) {
    const codeRef = useRef(null);
    useEffect(() => {
        const clipboard = new ClipboardJS('.code', {
            text: () => codeRef.current.innerText, 
        });

        clipboard.on('success', function (e) {
            alert('Text copied to clipboard!');
            e.clearSelection();
        });

        return () => clipboard.destroy();
    }, []);

    return (
        <>
            <div className="relative max-w-2xl mx-auto mt-24">
                <div className="bg-gray-900 text-white p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Result :</span>
                        <button className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md" data-clipboard-target="#code">
                            Copy
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <pre id="code" className="text-gray-300">
                            <code ref={codeRef}>
                                {result || verifyResult}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Result;

