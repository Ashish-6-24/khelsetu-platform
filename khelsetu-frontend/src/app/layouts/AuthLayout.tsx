interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            KhelSetu
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete Sports Tournament Management
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};
