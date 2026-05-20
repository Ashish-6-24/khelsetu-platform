export const LandingPage = () => {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Complete Sports Tournament Management
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            KhelSetu provides everything you need to organize, manage, and score
            tournaments with real-time updates.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/auth/register"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div id="features" className="mt-32">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Live Scoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time ball-by-ball scoring with instant updates
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Tournament Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage tournaments with ease
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                OBS Overlays
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional broadcast overlays for streaming
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
