import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const AllUrls = () => {
  const authToken = localStorage.getItem("token");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all URLs for the logged-in user
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

  // Delete a URL
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
  }, []);

  return (
    <div className="max-w-4xl mx-auto  my-auto p-4 h-[100vh] flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">All Shortened URLs</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500">No URLs found.</p>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <div
              key={url._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md     box-shadow: #111 0px 0px 0px 1px;"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  Original: {url.originalUrl}
                </p>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {url.shortUrl}
                </a>
                <p className="text-xs text-gray-500 mt-1">Clicks: {url.clicks}</p>
              </div>

              <button
                onClick={() => handleDelete(url._id)}
                className="text-red-500 hover:text-red-700 transition mt-2 sm:mt-0 sm:ml-4"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUrls;
