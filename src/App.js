import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ top: 0, left: 0, duration: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ in: 0, out: 0 });
  const [bestTime, setBestTime] = useState(0);

  const moveElement = () => {
    const element = document.querySelector(".sphere");

    setIsRunning(true);

    // possible dimensions minus sphere size
    const h = window.innerHeight - 60;
    const w = window.innerWidth - 60;
    // new position
    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);

    // distance formula
    const distance = Math.sqrt(
      (nh - parseInt(element.style.top)) ** 2 +
        (nw - parseInt(element.style.left)) ** 2
    );

    // distance / px multplied by 1000 to make it px/s
    const duration = (distance / 180) * 1000;

    setPosition({
      top: nh,
      left: nw,
      duration: duration,
    });
  };

  const handleAnimationEnd = () => {
    moveElement();
  };

  // replaying on trasition end
  useEffect(() => {
    const element = document.querySelector(".sphere");
    element.addEventListener("transitionend", handleAnimationEnd);
    return () => {
      element.removeEventListener("transitionend", handleAnimationEnd);
    };
  }, []);

  // Updating best time
  useEffect(() => {
    if (time.out < time.in) return;
    const currentTime = ((time.out - time.in) / 1000).toFixed(2);
    currentTime > bestTime ? setBestTime(currentTime) : setBestTime(bestTime);
  }, [time]);

  const handleMouseInteract = (e) => {
    e.type === "mouseenter"
      ? setTime((prev) => {
          return {
            in: e.timeStamp,
            out: prev.out,
          };
        })
      : setTime((prev) => {
          return {
            in: prev.in,
            out: e.timeStamp,
          };
        });
  };

  useEffect(() => {
    const element = document.querySelector(".sphere");
    element.addEventListener("mouseenter", handleMouseInteract);
    return () => {
      element.removeEventListener("mouseenter", handleMouseInteract);
    };
  }, []);
  useEffect(() => {
    const element = document.querySelector(".sphere");
    element.addEventListener("mouseleave", handleMouseInteract);
    return () => {
      element.removeEventListener("mouseleave", handleMouseInteract);
    };
  }, []);

  return (
    <div>
      <div className='text-white text-3xl font-bold'>
        Current best time= {bestTime}s
      </div>
      <div
        className='sphere'
        style={{
          top: position.top + "px",
          left: position.left + "px",
          transitionDuration: position.duration + "ms",
        }}
        onClick={isRunning ? null : moveElement}
      ></div>
    </div>
  );
}

export default App;
