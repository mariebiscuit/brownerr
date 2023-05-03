import { useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";

import TalentCard from "./components/cards/TalentCard"
import { Opportunity, User } from "./Utilities";
import OpportunityCard from "./components/cards/OpportunityCard";
import OrganizerCard from "./components/cards/OrganizerCard";
import ProfilePage from "./components/profile_page/ProfilePage";
import OpportunityPage from "./components/opportunity_page/OpportunityPage";
import MainPage from "./components/main_page/MainPage";
import { Route, Routes } from "react-router-dom";

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
                      id: 1

  }

 

  let job1: Opportunity = {name: "DJ Partner Wanted for Cool Remix Project :)",
                           type: "Collab",
                           category: "Music",
                           subcategory: "DJ",
                           content: "",
                           location: "TBD",
                           poster: user1,
                           startDate: {year: 2023, month: 4, date: 22},
                           endDate: {year: 2023, month: 5, date: 1},
                           overview: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
                           responsibility: ["Sorem ipsum dolor sit amet, consectetur adipiscing elit.", "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", "per conubia nostra, per inceptos himenaeos. Curabitur tempus " ],
                           qualification: ["Sorem ipsum dolor sit amet, consectetur adipiscing elit.", "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", "per conubia nostra, per inceptos himenaeos. Curabitur tempus " ],
                           applicants: [user1, user1, user1, user1, user1, user1, user1, user1, user1, user1],
                           id: 1
                           
  
  }
  
  const [currentUser, setCurrentUser] = useState<User | undefined> (undefined);
  const [profiles, setProfiles] = useState<User[]> ([user1]);
  const [opportunities, setOpportunities] = useState<Opportunity[]> ([job1]);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage user={user1}></MainPage>}/>
        <Route path="/talent">
          <Route path=":id" element={<ProfilePage talentView={true} talentList={profiles}></ProfilePage>}/>
        </Route>
        <Route path="/organizer">
          <Route path=":id" element={<ProfilePage talentView={false} talentList={profiles}></ProfilePage>}/>
        </Route>

        <Route path="/opportunity">
          <Route path=":id" element={<OpportunityPage jobList={opportunities}></OpportunityPage>}/>
        </Route>
      </Routes>
      <div className="content-div">
      <div className="repl">
      
      
      {/* <TalentCard user = {user1}/>

      <OpportunityCard job = {job1}/>

      <OrganizerCard user = {user1}/>  
      <ProfilePage user = {user1} talentView = {true}/>
      <OpportunityPage job = {job1}></OpportunityPage>
      */}

      <OrganizerCard user = {user1}/> 
      
      <OpportunityCard job = {job1}/>
      

      

      
      
      </div>
    </div>
    </>
    
  );
}

export default App;
