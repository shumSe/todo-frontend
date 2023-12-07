import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import ErrorPage from "./pages/ErrorPage";


function App() {

  return (
    <div className="App">
  
      {<div className="container">

        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/addTodo" element={<AddTodo/>}/>
            <Route path="/editTodo" element={<EditTodo/>}/>
            <Route exact path="*" element={<ErrorPage/>} />
          </Routes>
        </Router>

      </div> }

    </div>
  );
}

export default App;
