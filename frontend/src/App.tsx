import { useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";

import TalentCard from "./components/TalentCard"
import { User } from "./Utilities";

interface AppProps {

}

/**
 * Function that renders the REPL web app
 * @returns the div that contains headers, history box, and input box
 */
function App(props: AppProps) {

  let user: User = { name: "Gus",
                     profilePicPath: "",
                     categories: [],
                     subcategories: [],
                      bio: "",
                      rate: 12,
                      rating: 5,
                      availability: "",
                      overviews: "",
                      mediaPath: "",
                      reviews: [],
                      isOrganizer: false,
                      opportunities: []

  }

  return (
    <div className="content-div">
      <div className="repl">
      <Header/>
      
      <TalentCard user = {user}/>
      </div>
    </div>
  );
}

export default App;
