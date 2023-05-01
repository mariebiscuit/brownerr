import { useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";

import TalentCard from "./components/TalentCard"
import { Opportunity, User } from "./Utilities";
import OpportunityCard from "./components/OpportunityCard";
import OrganizerCard from "./components/OrganizerCard";
import ProfilePage from "./components/ProfilePage";

interface AppProps {

}

/**
 * Function that renders the REPL web app
 * @returns the div that contains headers, history box, and input box
 */
function App(props: AppProps) {

  let user1: User = { firstName: "Gus",
                      lastName: "Janek",
                      isOrganization: false,
                     profilePicPath: "../user_img.jpeg",
                     categories: ["Music"],
                     subcategories: ["DJ", "Performance"],
                      bio: `Brown 2024, Offer DJ service at parties`,
                      rate: 12,
                      rating: 4,
                      availability: "open",
                      overviews: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
                      mediaPath: "",
                      reviews: [],
                      isOrganizer: false,
                      

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
      
      
      {/* <TalentCard user = {user1}/>

      <OpportunityCard job = {job1}/>

      <OrganizerCard user = {user1}/>  */}
      <ProfilePage user = {user1} talentView = {true}/>
      </div>
    </div>
  );
}

export default App;
