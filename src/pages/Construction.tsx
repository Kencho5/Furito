const Construction = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-200 to-pink-300 px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-extrabold text-red-700 md:text-6xl">
          Coming Soon
        </h1>
        <p className="mb-10 text-xl text-red-600 md:text-2xl">
          We're crafting something lovely just for you. Stay tuned!
        </p>
        <div className="flex animate-pulse justify-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Construction;
