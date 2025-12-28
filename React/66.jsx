function myButton() {
  return (
    <button
      onClick={() => {
        alert("Hello, world!");
      }}
    >
      Click me!
    </button>
  );
}

function Container() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>This is a paragraph.</p>
      {myButton()}
    </div>
  );
}