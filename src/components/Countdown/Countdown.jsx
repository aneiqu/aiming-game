import CountdownNums from "./CountdownNums";

export default function Countdown({ countdownNum, counting }) {
  return (
    <div className='absolute flex top-0 left-0 w-screen h-screen flex-col items-center justify-center pointer-events-none'>
      <CountdownNums counting={counting} maxNum={countdownNum} />
    </div>
  );
}
