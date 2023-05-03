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
import TalentSection from "./TalentSection";
import OrganizerSection from "./OrganizerSection";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface ProfileProps {
  user: User;
  talentView: boolean;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function ProfilePage(props: ProfileProps) {
  const [contactActive, setContactActive] = useState(false);
  const [talentActive, setTalentActive] = useState(props.talentView);
  const handleClick = (variable: boolean, setter: (newVar: boolean) => void) => {
    setter(!variable)
  }


  return (
    <body>
      <div className="profile">
        <Container>
          <Row className="align-items-center py-5">
            <Col sm="6">
              <Row className="align-items-center">
                <Col sm="6">
                  <Card.Img className="avatar-big" src={props.user.profilePicPath} />
                </Col>
                <Col sm="6" >
                  <h1><span>{props.user.firstName} </span> <span className="ultra-thin">{props.user.lastName}</span></h1>
                  <p>{props.user.bio}</p>
                  {(() => {
                    switch(props.user.availability) {
                      case "open": return <Button className="availability-profile green"><AiOutlineSmile size={20} className="avail-icons"></AiOutlineSmile> Open to Work</Button> ;
                      case "moderate": return <Button className="availability-profile orange"><AiOutlineMeh size={20} className="avail-icons"></AiOutlineMeh> Slightly Busy</Button> ;
                      case "busy": return <Button className="availability-profile red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> ;
                      default: return <Button className="availability-profile red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> 
                    }
                  })()}
                </Col>
              </Row>
              
        
            </Col>
            <Col sm="2">
            </Col>
            <Col sm="4" >
              <div>
                <div className="stars-bg">
                <Rating initialValue={props.user.rating} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>
   
                </div>
                <div>
                  <h2 style={{fontSize: "20px"}}>
                    ${props.user.rate}/Hour
                  </h2>
                </div>
                <div>
                  <Row className="align-items-center">
                    <Col>
                      <Button className="contactButton green" onClick={() => handleClick(contactActive, setContactActive)}
                      style={{ backgroundColor: contactActive ? "#c7ffe4" : "#00bc61", borderColor: contactActive ? "#c7ffe4" : "#00bc61", color: contactActive ? "#00bc61" : "white" }}> Get in Touch</Button>
                    </Col>
                    <Col>
                      <Button className="beige"> <FiShare2 size={"20px"} color="black" strokeWidth={"2.5px"}></FiShare2>  </Button>
                    </Col>
                  </Row>
                  
                </div>
              </div>
              
           
            </Col>
          </Row>

          <div className="d-flex">
          <Button 
          onClick={() => talentActive ? void(0): handleClick(talentActive, setTalentActive)}
          className = "nav-btn"
          style={{ backgroundColor: talentActive ? "#FFEFDE" : "#fdfdfd00", borderColor: talentActive ? "#FFEFDE" : "#fdfdfd00", color: talentActive ? "black" : "white" }}
          >As Talent</Button>
          <Button 
          onClick={() => talentActive ? handleClick(talentActive, setTalentActive):void(0)}
          className = "nav-btn"
          style={{ backgroundColor: !talentActive ? "#FFEFDE" : "#fdfdfd00", borderColor: !talentActive ? "#FFEFDE" : "#fdfdfd00", color: !talentActive ? "black" : "white" }}
          >As Organizer</Button>
        </div>
        </Container>

        <div className="content-div">
          {
            talentActive ? (
              <TalentSection user={props.user}></TalentSection>
            ):(
              <OrganizerSection user={props.user}></OrganizerSection>
            )
          }
        </div>
        
        
      </div>
    </body>
  );

}
