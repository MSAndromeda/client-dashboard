const WelcomeSection = () => {
  return (
    <div className="bg-blue-600 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Man 👋</h1>
        <p className="text-purple-100">
          You've learned 70% of your goal this week!
        </p>
        <p className="text-purple-100">Keep it up and improve your progress.</p>
      </div>
      <div className="absolute top-4 right-4">
        {/* <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🤖</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WelcomeSection;
