import { useEffect, useState } from "react";
import RadioInput from "../re-usable/RadioInput";

export default function MainMenu({
  startGame,
  moveSphere,
  moveDelay,
  gameStarted,
  allowTrackingTime,
}) {
  const [mode, setMode] = useState();

  const handleGameStart = () => {
    startGame(true);
    setTimeout(() => {
      moveSphere();
      allowTrackingTime("test");
    }, moveDelay * 1000);
  };

  useEffect(() => {}, [mode]);
  return (
    <div
      className={`absolue h-screen w-screen flex justify-center items-center ${gameStarted ? "hidden" : ""}`}
    >
      <div className='w-2/5 h-2/4 bg-white/10 backdrop-blur-sm'>
        <section className='w-full h-1/6 bg-transparent'>
          <div className='uppercase text-5xl text-center  text-transparent font-bold  bg-clip-text bg-gradient-to-br '>
            Sphere Game
          </div>
        </section>
        <section className='w-full h-3/5 bg-transparent'>
          <div className='w-full h-min mb-4 flex justify-center'>
            <div className='text-3xl'>Mode</div>
          </div>
          <div className='flex justify-around mx-24'>
            <div>
              <RadioInput
                name='mode'
                id='easy'
                label={"Easy"}
                updateData={setMode}
                disabled={true}
              />
            </div>
            <div>
              <RadioInput
                name='mode'
                id='medium'
                label={"Medium"}
                updateData={setMode}
                disabled={true}
              />
            </div>
            <div>
              <RadioInput
                name='mode'
                id='hard'
                label={"Hard"}
                updateData={setMode}
                disabled={true}
              />
            </div>
            <div>
              <RadioInput
                name='mode'
                id='freeplay'
                label={"Freeplay"}
                updateData={setMode}
              />
            </div>
          </div>
        </section>
        <section className='w-full h-1/5 bg-transparent'>
          <div className='h-full w-full flex items-center justify-center'>
            <button
              className='h-2/3 w-1/2 text-xl backdrop-blur-sm hover:bg-zinc-700 border border-white duration-500'
              onClick={handleGameStart}
            >
              START
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
