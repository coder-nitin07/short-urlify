import { useState } from "react";
import axios from "axios";

// --- SVG Icons for a better user experience ---
const ClipboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v2.25c0 .966-.784 1.75-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75V4.5c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);

const CheckIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
);


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
        "https://short-urlify.onrender.com/url/urlShortner",
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
    <main className="w-full bg-neutral-100 dark:bg-black py-10 px-4 h-[100vh] flex items-center">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800">
        {/* Header */}
        <div className="p-8 border-b border-neutral-300 dark:border-neutral-800">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            URL Shortener
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Enter a long URL to make it short and easy to share.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleShorten} className="space-y-4">
            <div>
              <label htmlFor="longUrl" className="sr-only">
                Long URL
              </label>
              <input
                id="longUrl"
                type="url"
                required
                placeholder="https://example.com/very-long-url-to-shorten"
                className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
            </div>

            {error && (
              <div
                className="bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 px-3 py-2 text-sm"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-50 dark:hover:bg-neutral-200 text-white dark:text-black font-medium py-2.5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {shortUrl && (
            <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Shortened URL:
              </label>
              <div className="flex items-center gap-2 p-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow text-blue-600 dark:text-blue-500 hover:underline truncate"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200"
                  }`}
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <ClipboardIcon className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;