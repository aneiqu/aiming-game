export default function CountdownNums({ counting, maxNum }) {
  const arr = [];
  if (maxNum > 99) return console.log("Max number is 99");
  for (let i = 0; i <= maxNum; i++) {
    arr.push(
      <div
        key={i}
        className={`absolute transition-opacity opacity-0 ${counting ? "opacity-[100]" : ""}`}
        style={{ transitionDelay: `${i}s` }}
      >
        <div
          className={` text-white text-9xl font-bold duration-[1000ms] opacity-100 select-none ${counting ? "-translate-y-96 opacity-[0]" : ""}`}
          style={{ transitionDelay: `${i}s` }}
        >
          {maxNum - i}
        </div>
      </div>
    );
  }

  return <>{arr}</>;
}
