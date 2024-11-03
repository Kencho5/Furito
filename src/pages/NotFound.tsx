import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="mt-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neutral-900">404</h1>
        <p className="mt-4 text-2xl font-semibold text-neutral-800">
          Page Not Found
        </p>
        <p className="mt-2 text-neutral-500">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
