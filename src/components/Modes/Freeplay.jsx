export default function FreeplayInterface({ bestTime, updateSpeed }) {
  return (
    <div className='absolute'>
      <div className='text-white text-3xl font-bold w-fit ml-2'>
        Current best time= {bestTime}s
      </div>
      <form onSubmit={updateSpeed} className='ml-2 mt-1'>
        <input
          type='number'
          className='text-black text-3xl font-bold relative w-fit outline outline-white'
          placeholder='px/second (180 by default)'
        ></input>
        <button
          type='submit'
          className='text-white text-3xl font-bold relative w-fit ml-2'
        >
          Update
        </button>
      </form>
    </div>
  );
}
