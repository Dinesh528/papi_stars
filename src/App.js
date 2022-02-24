import "./App.css";
import PStars from "./components/PStars";

function App() {
  return (
    <div className="container-fluid">
      <h1 className="text-center py-4 my-5"> PAPI Stars</h1>
      <div className="">
        <PStars />
      </div>
    </div>
  );
}

export default App;
