import { useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";

import TalentCard from "./components/TalentCard"
import { Opportunity, User } from "./Utilities";
import OpportunityCard from "./components/OpportunityCard";
import OrganizerCard from "./components/OrganizerCard";

interface AppProps {

}

/**
 * Function that renders the REPL web app
 * @returns the div that contains headers, history box, and input box
 */
function App(props: AppProps) {

  let user1: User = { name: "Gus J.",
                      isOrganization: false,
                     profilePicPath: "../user_img.jpeg",
                     categories: ["Music"],
                     subcategories: ["DJ", "Performance"],
                      bio: "",
                      rate: 12,
                      rating: 4,
                      availability: "open",
                      overviews: "",
                      mediaPath: "",
                      reviews: [],
                      isOrganizer: false,
                      opportunities: []

  }

  let job1: Opportunity = {name: "DJ Partner Wanted for Cool Remix Project :)",
                           type: "Collab",
                           category: "Music",
                           subcategory: "DJ",
                           content: "",
                           location: "TBD",
                           poster: user1,
                           startDate: {year: 2023, month: 4, date: 22},
                           endDate: {year: 2023, month: 5, date: 1}
  
  }

  return (
    <div className="content-div">
      <div className="repl">
      <Header/>
      
      <TalentCard user = {user1}/>

      <OpportunityCard job = {job1}/>

      <OrganizerCard user = {user1}/>
      </div>
    </div>
  );
}

export default App;
