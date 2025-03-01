import { useState } from "react";

function UrlInputForm() {
  const [url, setUrl] = useState(""); // Store the input URL

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Do something fun with the URL
    alert(`You entered: ${url}`);
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
    </div>
);
}

export default UrlInputForm;
