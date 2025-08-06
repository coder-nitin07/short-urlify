// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-center py-4 mt-10">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} ShortUrliFy. All rights reserved.
        </p>
        <p className="text-xs mt-1">
            <a href="#" className="underline hover:text-blue-500">GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
