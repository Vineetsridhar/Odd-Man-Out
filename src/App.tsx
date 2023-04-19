import { useEffect, useState, useSyncExternalStore } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useFirebaseDatabase } from "./hooks/useFirebaseDatabase";

function App() {
  const [count, , setCount] = useFirebaseDatabase("count", 0);
  const [name, , setName] = useFirebaseDatabase("name", "John Doe");

  const [localName, setLocalName] = useState(name);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <input
        type="text"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
      />
      <button onClick={() => setName(localName)}>Set Name</button>
    </div>
  );
}

export default App;
