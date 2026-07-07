export const ScoreboardOverlay = () => {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <p className="text-sm uppercase tracking-wider text-blue-300">
              Live Match
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-4xl font-bold">Team A</p>
              <p className="text-6xl font-bold mt-4">150/3</p>
              <p className="text-xl text-blue-300 mt-2">(18.4 overs)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">vs</p>
              <p className="text-lg text-blue-300 mt-2">RR: 8.03</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">Team B</p>
              <p className="text-6xl font-bold mt-4">145/5</p>
              <p className="text-xl text-blue-300 mt-2">(20 overs)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
