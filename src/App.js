import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ top: 0, left: 0, duration: 1000 });
  const [isRunning, setIsRunning] = useState(false);
  const moveElement = () => {
    setIsRunning(true);

    // possible dimensions minus sphere size
    const h = window.innerHeight - 50;
    const w = window.innerWidth - 50;
    // new position
    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);
    // distance formula
    const distance = Math.sqrt(
      (nh - position.top) ** 2 + (nw - position.left) ** 2
    );
    // distance / px multplied by 1000 to make it px/s
    const duration = (distance / 180) * 1000;
    setPosition({ top: nh, left: nw, duration: duration });
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
  return (
    <div
      className='sphere'
      style={{
        height: "50px",
        width: "50px",
        top: position.top + "px",
        left: position.left + "px",
        transitionDuration: position.duration + "ms",
      }}
      onClick={isRunning ? null : moveElement}
    ></div>
  );
}

export default App;
