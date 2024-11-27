import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="text-4xl font-bold mb-6 bg-gray-200 p-4 rounded-lg shadow-md">
        {formatTime()}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={start}
        >
          Start
        </button>
        <button
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition"
          onClick={stop}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
