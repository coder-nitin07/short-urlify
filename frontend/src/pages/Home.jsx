import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:3000/url/urlShortner",
        { originalUrl: longUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShortUrl(res.data.URL.shortUrl);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 flex flex-col justify-center h-[100vh]">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        🔗 Shorten Your URL
      </h2>

      <form onSubmit={handleShorten} className="space-y-4">
        <input
          type="url"
          required
          placeholder="Paste your long URL here..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {error && (
          <p className="text-sm bg-red-500 text-white px-3 py-1 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 bg-green-100 dark:bg-green-900 p-4 rounded-md flex justify-between items-center flex-wrap gap-2">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 dark:text-blue-400 underline break-all"
          >
            {shortUrl}
          </a>

          <button
            onClick={handleCopy}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;