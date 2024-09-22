import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-600">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
