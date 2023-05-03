import { User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import {FiShare2} from "react-icons/fi"
import { useState } from "react";



/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface MainProps {
  user: User;

}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function MainPage(props: MainProps) {
  const [view, setView] = useState("talent");



  return (
    <body>
      <div className="profile">
        <Container>
          <div className="d-flex">
          <Button 
          onClick={() => view === "talent" ? void(0): setView("talent")}
          className = "nav-btn"
          style={{ backgroundColor: view === "talent"? "#FFEFDE" : "#fdfdfd00", borderColor: view === "talent" ? "#FFEFDE" : "#fdfdfd00", color: view === "talent" ? "black" : "white" }}
          >Student Talents</Button>
          <Button 
          onClick={() => view === "organizer" ? void(0): setView("organizer")}
          className = "nav-btn"
          style={{ backgroundColor: view === "organizer"? "#FFEFDE" : "#fdfdfd00", borderColor: view === "organizer" ? "#FFEFDE" : "#fdfdfd00", color: view === "organizer" ? "black" : "white" }}
          >Organizers</Button>
          <Button 
          onClick={() => view === "opportunities" ? void(0): setView("opportunities")}
          className = "nav-btn"
          style={{ backgroundColor: view === "opportunities"? "#FFEFDE" : "#fdfdfd00", borderColor: view === "opportunities" ? "#FFEFDE" : "#fdfdfd00", color: view === "opportunities" ? "black" : "white" }}
          >Opportunities</Button>
         
        </div>
        </Container>

        <div className="content-div">
          {
          
          }
        </div>
        
        
      </div>
    </body>
  );

}
