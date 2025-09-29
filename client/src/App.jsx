import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

function App() {
  return (
    <>
      <img src="/images/logo.svg" alt="Logo" />
      <h1>Muebleria Hermanos Jota</h1>
    </>
  );
}

export default App;
