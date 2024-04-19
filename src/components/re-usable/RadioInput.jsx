export default function RadioInput({ name, id, label, updateData, disabled }) {
  return (
    <>
      <input
        onChange={() => updateData(id)}
        type='radio'
        name={name}
        id={id}
        disabled={disabled}
      ></input>
      {label ? (
        <label
          className={`select-none ${disabled ? "opacity-70 line-through" : ""}`}
        >
          {label}
        </label>
      ) : (
        ""
      )}
    </>
  );
}
