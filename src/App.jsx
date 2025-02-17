import React, { useEffect, useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerState, setTimerState] = useState(true);
  const [modeState, seteModeState] = useState(true);
  const toggleTimer = () => {
    setTimerState((prev) => !prev);
  };

  const restartTimer = () => {
    setCounter(900);
  };

  const setTimer = () => {
    let userCount = prompt("How many minutes do you want the timer to be?");
    userCount *= 60;

    setCounter(userCount);
  };

  const modeSet = () => {
    seteModeState((prev) => !prev);
  };

  useEffect(() => {
    let interval;

    if (timerState) {
      interval = setInterval(() => {
        setCounter((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(interval);
          console.log("Timer done");
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState, counter]);

  useEffect(() => {
    setHours(Math.floor(counter / 3600));
    setMinutes(Math.floor((counter / 60) % 60));
    setSeconds(Math.floor(counter % 60));
  }, [counter]);

  return (
    <div
      className={`flex flex-col-1 items-center justify-between min-h-screen ${
        modeState ? "bg-black text-gray-300" : "bg-gray-300 text-black"
      } duration-300 ease-in-out px-4  gap-8`}
    >
      <div className="flex flex-wrap justify-center items-center text-center gap-6 md:gap-12 lg:mx-16 text-gray-300">
        <div className="bg-stone-950 p-12 md:p-24 text-6xl md:text-9xl rounded-lg">
          {hours.toString().padStart(2, "0")}
        </div>
        <div className="bg-stone-950 p-12 md:p-24 text-6xl md:text-9xl rounded-lg">
          {minutes.toString().padStart(2, "0")}
        </div>
        <div className="bg-stone-950 p-12 md:p-24 text-6xl md:text-9xl rounded-lg">
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-md text-gray-300 mix-blend-difference">
        <button
          className={`w-full md:w-auto px-4 py-2 text-lg  rounded-lg  duration-300 ease-in-out`}
          onClick={toggleTimer}
        >
          {timerState ? "Pause" : "Resume"}
        </button>

        <button
          className="w-full md:w-auto  px-4 py-2 text-lg   rounded-lg duration-300 ease-in-out"
          onClick={restartTimer}
        >
          15 Minute
        </button>

        <button
          className="w-full md:w-auto  px-4 py-2 text-lg   rounded-lg duration-300 ease-in-out"
          onClick={setTimer}
        >
          Custom
        </button>
      </div>

      <button className="absolute top-0 right-0 p-3" onClick={modeSet}>
        {modeState ? "dark" : "light"}
      </button>
    </div>
  );
};

export default App;
