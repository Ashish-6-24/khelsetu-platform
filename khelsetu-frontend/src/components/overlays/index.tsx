export const ScoreOverlay = () => {
  return (
    <div className="bg-black text-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">Team A</p>
          <p className="text-4xl font-bold">150/3</p>
          <p className="text-sm text-gray-400">(18.4 overs)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">vs</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">Team B</p>
          <p className="text-4xl font-bold">145/5</p>
          <p className="text-sm text-gray-400">(20 overs)</p>
        </div>
      </div>
    </div>
  );
};

export const ScoreboardOverlay = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-lg">
      <div className="text-center mb-4">
        <p className="text-sm uppercase tracking-wider text-blue-300">
          Live Match
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-3xl font-bold">Team A</p>
          <p className="text-5xl font-bold mt-2">150/3</p>
          <p className="text-lg text-blue-300 mt-1">(18.4 overs)</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">vs</p>
          <p className="text-sm text-blue-300 mt-2">RR: 8.03</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">Team B</p>
          <p className="text-5xl font-bold mt-2">145/5</p>
          <p className="text-lg text-blue-300 mt-1">(20 overs)</p>
        </div>
      </div>
    </div>
  );
};
