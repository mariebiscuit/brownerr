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
import { useEffect, useState } from "react";
import TalentSection from "./TalentSection";
import OrganizerSection from "./OrganizerSection";
import { useParams } from "react-router-dom";
import { URLPREFIX } from "../../Utilities";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface ProfileProps {
  talentList: User[];
  talentView: boolean;
  idToIndex: Map<string, number>;
  currentCredential: string | undefined;
  currentUser: User | undefined;
  triggerDbUpdate: () => void;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function ProfilePage(props: ProfileProps) {

    function handleSubmitEdits(){
      if (props.currentUser != undefined){
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'text/plain'},
          body: JSON.stringify({
            'credential': props.currentCredential,
            'bio': editableUser.get('bio'),
            'name': editableUser.get('name'),
            'picture': editableUser.get('picture')})
        }

        fetch(URLPREFIX + "user/update/" + props.currentUser.id, requestOptions).then(
          response => response.json()).then(data => {
            (data['code'] == 200)? (
              props.triggerDbUpdate()):({})
            })
      }
    };

    function createEditableUser(){
      if (props.currentUser !== undefined){
        setEditableUser(new Map([
          ['bio', props.currentUser.bio],
          ['name', props.currentUser.name],
          ['picture', props.currentUser.picture]
        ]))
      }
    };

  const {id} = useParams();
  var idx = -1;
  try{
    if (id != undefined){
      const initIdx = props.idToIndex.get(id)
      if (initIdx != undefined) {
        idx = initIdx;
      }
    }
  } catch{
    console.log("Could not find user")
  }
  
  const [viewedUser, setViewedUser] = useState<User>();
    useEffect(() => {
      setViewedUser(props.talentList[idx])
  }, [idx]);

  const [contactActive, setContactActive] = useState(false);
  const [talentActive, setTalentActive] = useState(props.talentView);
  const [editing, setEditing] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<Map<string, string>>(new Map());

  const handleClick = (variable: boolean, setter: (newVar: boolean) => void) => {
    setter(!variable)
  }

  function handleChange(key: string, value: string){
    setEditableUser(new Map(editableUser.set(key, value)))
  };


  if(viewedUser === undefined){
    return (<body>
      <div className="profile">
        <h1>No Profile Found</h1>
      </div>
    </body>);
  } else {
    return (
        <div className="profile">
          <Container>
            <Row className="align-items-center py-5">
              <Col sm="6">
                <Row className="align-items-center">
                  <Col sm="6">
                    <Card.Img className="avatar-big" src={viewedUser.picture} />  {/** To be changed */}
                  </Col>
                  <Col sm="6" >
                    {(editing)?
                    (
                      <h1> <span className="editable" contentEditable="true" onInput={
                      e => (e.currentTarget.textContent != null)? 
                            handleChange('name', e.currentTarget.textContent):({})}> {viewedUser.name} </span> </h1>
                      ):(<h1><span>{viewedUser.name} </span> <span className="ultra-thin"></span></h1>
                      )
                    }
                    
                    {/* {(() => {
                      switch(user.availability) {
                        case "open": return <Button className="availability-profile green"><AiOutlineSmile size={20} className="avail-icons"></AiOutlineSmile> Open to Work</Button> ;
                        case "moderate": return <Button className="availability-profile orange"><AiOutlineMeh size={20} className="avail-icons"></AiOutlineMeh> Slightly Busy</Button> ;
                        case "busy": return <Button className="availability-profile red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> ;
                        default: return <Button className="availability-profile red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> 
                      }
                    })()} */}
                  </Col>
                </Row>
          
              </Col>
              <Col sm="2">
              </Col>
              <Col sm="4" >
                <div>
                  <div className="stars-bg">
                  <Rating initialValue={viewedUser.rating_provider} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>
     
                  </div>
                  <div>
                    {/* <h2 style={{fontSize: "20px"}}>
                      ${user.rate}/Hour
                    </h2> */}
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
                    <Row>
                      {((props.currentUser != undefined) && (props.currentUser.id == viewedUser.id))?
                       ((editing)? (
                                    <Button onClick=
                                        {() => {
                                        handleClick(editing, setEditing)
                                        handleSubmitEdits()}}> Save </Button>
                                    ): (
                                      <Button onClick=
                                          {() => 
                                          {createEditableUser();
                                            handleClick(editing, setEditing);}
                                          }> Edit </Button>
                                      )
                       ):(<p></p>)}
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
                <TalentSection user={viewedUser} editing={editing} currentUser={props.currentUser} currentCredential={props.currentCredential} talentList={props.talentList} idToIndex={props.idToIndex}></TalentSection>
              ):(
                <OrganizerSection user={viewedUser} talentList={props.talentList} idToIndex={props.idToIndex}></OrganizerSection>
              )
            }
          </div>
          
          
        </div>
      
    );
  }

  

}
