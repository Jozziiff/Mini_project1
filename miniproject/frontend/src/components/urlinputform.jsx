import { useState } from "react";

function UrlInputForm() {
  const [url, setUrl] = useState(""); // Store the input URL
  const [response, setResponse] = useState(""); // Store the response from the API


  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/fastapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!res.ok) {
        console.error("Error:", res.status);
        return;
      }
    
    const data = await res.json();
    setResponse(data.processed_url);
  };

return (
    <div className="mt-2 p-4 border-2 border-gray-500">
        <h2 className="text-xl font-bold mb-4 text-white">
            Enter a URL
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                type="url"
                placeholder="Enter a valid URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded"
            >
                Submit
            </button>
        </form>
        <div className="mt-4 text-white text-lg font-semibold border-2 border-gray-400">
            {response && <p> Processed URL: {response}</p>}
        </div>
        
    </div>
);
}

export default UrlInputForm;
