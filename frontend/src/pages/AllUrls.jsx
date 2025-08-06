import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// --- SVG Icon for the delete button, replacing react-icons ---
const TrashIcon = (props) => (
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);


const AllUrls = () => {
  // --- All original logic and state management are preserved below ---
  const authToken = localStorage.getItem("token");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserUrls = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://short-urlify.onrender.com/url/getUserUrls", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.data.urls) {
        setUrls(res.data.urls);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://short-urlify.onrender.com/url/deleteUrl/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.success("URL deleted successfully");
      setUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete URL");
    }
  };

  useEffect(() => {
    fetchUserUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // --- End of original logic section ---

  return (
    <main className="w-full bg-neutral-100 dark:bg-black py-10 px-4 h-[120vh]">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800">
        {/* Header */}
        <div className="p-8 border-b border-neutral-300 dark:border-neutral-800">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            All URLs
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            A complete list of your generated short links.
          </p>
        </div>

        {/* URL List Container */}
        <div className="p-8">
          {loading ? (
            <p className="text-center text-neutral-500 dark:text-neutral-400">Loading your links...</p>
          ) : urls.length === 0 ? (
            <p className="text-center text-neutral-500 dark:text-neutral-400">You haven't created any short URLs yet.</p>
          ) : (
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-neutral-200 dark:divide-neutral-800">
                {urls.map((url) => (
                  <li key={url._id} className="flex items-center justify-between gap-4 py-4">
                    {/* URL Details */}
                    <div className="min-w-0">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate mb-1" title={url.originalUrl}>
                        <span className="font-medium">Original:</span> {url.originalUrl}
                      </p>
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-500 hover:underline font-medium break-all"
                      >
                        {url.shortUrl}
                      </a>
                    </div>

                    {/* Clicks and Delete */}
                    <div className="flex-shrink-0 flex items-center gap-4">
                       <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 border border-neutral-200 dark:border-neutral-700">
                         Clicks: {url.clicks}
                       </p>
                      <button
                        onClick={() => handleDelete(url._id)}
                        className="p-2 text-neutral-500 dark:text-neutral-400 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200"
                        aria-label="Delete URL"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllUrls;