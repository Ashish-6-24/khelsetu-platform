import { ROUTES } from '@utils/constants';

import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to={ROUTES.HOME}
          className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
