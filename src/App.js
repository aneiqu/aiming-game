import { useEffect, useState } from "react";
import "./App.css";
import Countdown from "./components/Countdown/Countdown";
import MainMenu from "./components/MainMenu/MainMenu";
import FreeplayInterface from "./components/Modes/Freeplay";

function App() {
  const [isCounting, setIsCounting] = useState(false);
  const [countdownNum, setCountDownNum] = useState(3);
  const [position, setPosition] = useState({
    top: Math.random() * (window.innerHeight - 75),
    left: Math.random() * (window.innerWidth - 75),
    duration: 0,
  });
  const [time, setTime] = useState({ in: 0, out: 0 });
  const [bestTime, setBestTime] = useState(0);
  const [speed, setSpeed] = useState(180);
  const [canTrackTime, setCanTrackTime] = useState(false);

  const moveSphere = () => {
    const element = document.querySelector(".sphere");

    // possible dimensions minus sphere size
    const h = window.innerHeight - 75;
    const w = window.innerWidth - 75;
    // new position
    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);
    // distance formula
    const distance = Math.sqrt(
      (nh - parseInt(element.style.top)) ** 2 +
        (nw - parseInt(element.style.left)) ** 2
    );

    // distance / px multplied by 1000 to make it px/s
    const duration = (distance / +element.getAttribute("speed")) * 1000;

    setPosition({
      top: nh,
      left: nw,
      duration: duration,
    });
  };

  const handleAnimationEnd = () => {
    moveSphere();
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

  const handleSpeedUpdate = (e) => {
    e.preventDefault();
    +e.target[0].value <= 100
      ? alert("Minimum speed is 100px/s!")
      : setSpeed(+e.target[0].value);
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-zinc-700 to-zinc-900'>
      <FreeplayInterface updateSpeed={handleSpeedUpdate} bestTime={bestTime} />
      <div
        className='sphere'
        speed={speed}
        style={{
          top: position.top + "px",
          left: position.left + "px",
          transitionDuration: position.duration + "ms",
          opacity: `${canTrackTime ? 1 : 0}`,
          transitionDelay: "0.3s",
        }}
      ></div>

      {/* Trial ahead of main ball to show direction of next move */}
      {/* <div
        className='sphere'
        speed={speed}
        style={{
          top: position.top + "px",
          left: position.left + "px",
          transitionDuration: position.duration + "ms",
          opacity: `${canTrackTime ? 0.2 : 0}`,
          backgroundColor: "blue",
          transitionDelay: "0.4s",
        }}
      ></div>
      <div
        className='sphere'
        speed={speed}
        style={{
          top: position.top + "px",
          left: position.left + "px",
          transitionDuration: position.duration + "ms",
          opacity: `${canTrackTime ? 0.4 : 0}`,
          backgroundColor: "blue",
          transitionDelay: "0.2s",
        }}
      ></div>
      <div
        className='sphere'
        speed={speed}
        style={{
          top: position.top + "px",
          left: position.left + "px",
          transitionDuration: position.duration + "ms",
          opacity: `${canTrackTime ? 0.6 : 0}`,
          backgroundColor: "blue",
        }}
      ></div> */}

      <MainMenu
        allowTrackingTime={setCanTrackTime}
        resetTime={setTime}
        moveSphere={moveSphere}
        moveDelay={countdownNum}
        startGame={setIsCounting}
        gameStarted={isCounting}
      />
      <Countdown countdownNum={countdownNum} counting={isCounting} />
    </div>
  );
}

export default App;
