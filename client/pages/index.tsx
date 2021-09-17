import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <p className="text-white font-bold text-2xl">
        Welcome to the starter page
      </p>
    </div>
  );
};

export default Home;
