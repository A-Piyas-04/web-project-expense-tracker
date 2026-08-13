export default function Input({ label, id, ...props }) {
  // TODO: add error state and validation styling
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} />
    </div>
  );
}
