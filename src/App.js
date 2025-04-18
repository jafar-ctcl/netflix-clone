import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css"
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import { orginals,action,horror,comedy,documentaries} from "./urls"; 
function App() {
  return (
    <div className="App">
    <NavBar />
    <Banner />
    <RowPost url={orginals} title='Netflix Orginals'/>
    <RowPost url= {action} title='Action' isSmall/>
    <RowPost url= {horror} title='Horror' isSmall/>
    <RowPost url= {comedy} title='Comedy' isSmall/>
    <RowPost url= {documentaries} title='Documentaries' isSmall/>
    </div>
  );
}

export default App;
