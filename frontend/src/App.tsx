import { useEffect, useState } from "react";
import "../styles/App.css";
import { Opportunity, User } from "./Utilities";

import ProfilePage from "./components/profile_page/ProfilePage";
import OpportunityPage from "./components/opportunity_page/OpportunityPage";
import MainPage from "./components/main_page/MainPage";
import { Link, Route, Routes } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';


interface AppProps {

}

/**
 * Function that renders the REPL web app
 * @returns the div that contains headers, history box, and input box
 */
function App(props: AppProps) {
  

  // let user1: User = { firstName: "Gus",
  //                     lastName: "Janek",
  //                     isOrganization: false,
  //                    profilePicPath: "../user_img.jpeg",
  //                    categories: ["Music"],
  //                    subcategories: ["DJ", "Performance"],
  //                     bio: `Brown 2024, Offer DJ service at parties`,
  //                     rate: 12,
  //                     rating: 4,
  //                     availability: "open",
  //                     overviews: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
  //                     mediaPath: "",
  //                     reviews: [],
  //                     isOrganizer: false,
  //                     id: 1

  // }

  let user1: User = {available_provider: 1,
    bio: "I am a professional landscaper",
    created_at: "Tue, 02 May 2023 15:03:58 GMT",
    email: "bob.johnson2@example.com",
    id: 3,
    name: "Bob Johnson2",
    rating_provider: 0.0,
    rating_recipient: 0.0,
    service: 3,
    picture: '../user_img.jpeg'

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
  
  const [currentUser, setCurrentUser] = useState<User>();
  const [profiles, setProfiles] = useState<User[]> ([]);
  const [idToIndex, setIdToIndex] = useState<Map<number, number>>(new Map());
  const [opportunities, setOpportunities] = useState<Opportunity[]> ([job1, job1, job1, job1, job1, job1, job1, job1]);


  // Fetching all existing users in db
  useEffect(() => {
     async function getDataUser() {
      const response = await fetch(
        `http://localhost:2000/user/list/`
      ).then(response => response.json());
      
      const users : User[] = response
      setProfiles(users)
    }

    getDataUser().then(() => {    
      profiles.forEach((user, i) => {
      setIdToIndex(idToIndex.set(user.id, i))
    }) 
    console.log(idToIndex)
  })
  }, [])


  // useEffect(() => {
  //   async function getDataOpportunity() {
  //     const response = await fetch(
  //       `http://localhost:2000/user/list/`
  //     ).then(response => response.json());
      
  //     const users : User[] = response
  //     setProfiles(users)
  //     console.log(JSON.parse(response))
      
  //   }
  //   getDataOpportunity()
  // }, [])
 
  return (
    <body>
      <Navbar style={{backgroundColor:"transparent"}} expand="lg">
        <Container>
          <Navbar.Brand className="logo"><Link to={""}><span style={{color: "white"}} className="logo-text"> <span className="dm-serif">Browne</span><span className="roboto-italic">RR</span></span></Link> </Navbar.Brand>
         
          {//If user has not logged in
          currentUser == undefined &&   
            <div className = 'account-info'>  
              <GoogleLogin
              ux_mode='popup'
              text='signin'
              onSuccess={credentialResponse => {
                fetch(`http://localhost:2000/user/signin/` + credentialResponse.credential).then(
                  response => response.json().then(user => setCurrentUser(user))
                  )}}
              onError={() => {
                console.log('Login Failed');
              }}
              /> </div>
          }

          {// If user has logged in
          currentUser != undefined &&
            <div className="account-info"> 
              <span style={{color:"white"}}>Welcome, <strong>{currentUser.name}</strong> 
              <img className="avatar-stats mx-3" src= {currentUser.picture}/></span>
            </div>
          }
       

        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<MainPage user={user1} talentList={profiles} organizerList={profiles} opportunityList={opportunities}></MainPage>}/>
        <Route path="/talent">
          <Route path=":id" element={<ProfilePage talentView={true} talentList={profiles} idToIndex={idToIndex}></ProfilePage>}/>
        </Route>
        <Route path="/organizer">
          <Route path=":id" element={<ProfilePage talentView={false} talentList={profiles} idToIndex={idToIndex}></ProfilePage>}/>
        </Route>

        <Route path="/opportunity">
          <Route path=":id" element={<OpportunityPage jobList={opportunities}></OpportunityPage>}/>
        </Route>
      </Routes>

      
      
        

    
      
      
      {/* <TalentCard user = {user1}/>

      <OpportunityCard job = {job1}/>

      <OrganizerCard user = {user1}/>  
      <ProfilePage user = {user1} talentView = {true}/>
      <OpportunityPage job = {job1}></OpportunityPage>
      */}

      
    </body>
  
    
  );
}

export default App;
