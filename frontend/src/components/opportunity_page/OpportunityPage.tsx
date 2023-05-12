import { Opportunity, User } from "../../Utilities";
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
import { Link } from "react-router-dom";
import OrganizerSection from "./OpportunitySection";
import { URLPREFIX } from "../../Utilities";
import {IoLocationSharp, IoCalendarClear} from "react-icons/io5"
import OpportunitySection from "./OpportunitySection";
import { useParams } from "react-router-dom";
import Modal from "react-modal"
import Tooltip from '@mui/material/Tooltip';


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface OpportunityProps {
  jobList: Opportunity[];
  idToIndexO: Map<string, number>;
  talentList: User[];
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
export default function OpportunityPage(props: OpportunityProps) {
  const [poster, setPoster] = useState<User>();
  const [service_type, setType] = useState<string>();
  const [job, setJob] = useState<Opportunity>();

    // ===== Contact Functionality =====
    function sendMail(email:string){
      window.open("mailto:" + email + "?subject=I found you on BrowneRR!")
    }
      // ------ Contact Tooltip ------
      const [open, setOpen] = useState(false);
      const handleTooltipClose = () => {
        setOpen(false);
      };
      const handleTooltipOpen = () => {
        setOpen(true);
      };


  
  // ==== Set the right job based on URL =======
  const {id} = useParams();
  var idx = -1;
  try{
    if (id != undefined){
      const initIdx = props.idToIndexO.get(id)
      if (initIdx != undefined) {
        idx = initIdx;
      }
    }
  } catch{
    console.log("Could not find job")
  }
  
  useEffect(() => {
     setJob(props.jobList[idx])
     console.log(job?.poster)
  }, [idx, props.jobList]);

  // ======= Retrieve related job information ==========
  async function getDataUser(id:string) {
     const response = await fetch(
       `http://localhost:2000/user/id/${id}/`
     ).then(response => response.json());
     
     const user : User = response
     setPoster(user)
    }

  async function getServiceType(id:number) {
      const response = await fetch(
        `http://localhost:2000/service/${id}/`
      ).then(response => response.json());
      
      const service : string = response.service
      setType(service)
     }

  useEffect(() => {
    if(job != undefined){
      getDataUser(job.poster)
      getServiceType(job.job)
    }
  }, [job]) 

  // ====== Button state toggle on job page ========
  const [contactActive, setContactActive] = useState(false);
  const handleClick = (variable: boolean, setter: (newVar: boolean) => void) => {
    setter(!variable)
  }


  // ---- Delete Modal --------
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
  }


    // ===== Delete Functionality =====
    function handleDelete(){
      if (job != undefined){
        const requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'text/plain'},
          body: JSON.stringify({
            'credential': props.currentCredential})
        }
        
        fetch(URLPREFIX + "job/delete/" + job.id, requestOptions).then(
          response => response.json()).then(data => {
            if (data['code'] == 200){
                console.log("job is gone")
                props.triggerDbUpdate()
              }})
      }
    }
    // ===== Editing functionality =======
    const [editing, setEditing] = useState<boolean>(false);
    const [editableJob, setEditableJob] = useState<Map<string, string>>(new Map());

    function handleSubmitEdits(){
      if (job != undefined){
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'text/plain'},
          body: JSON.stringify({
            'credential': props.currentCredential,
            'overview': editableJob.get('overview'),
            'name': editableJob.get('name'),
            'location': editableJob.get('location')})
        }
        fetch(URLPREFIX + "job/update/" + job.id, requestOptions).then(
          response => response.json()).then(data => {
            if (data['code'] == 200){
                props.triggerDbUpdate()}
            }
          )
      }
    };

        function createEditableJob(){
          if (job !== undefined){
            setEditableJob(new Map([
              ['name', job.name],
              ['overview', job.overview],
              ['location', job.location]
            ]))
          }
        };


  function handleChange(key: string, value: string){
    setEditableJob(new Map(editableJob.set(key, value)))
  };



// ===== Render the page ========
  if(job === undefined){
    return (<body>
      <div className="profile">
        <h1>No job found</h1>
      </div>
    </body>);
  } else{
    // Fetching all existing users in db
    if(poster === undefined){
      return (<body>
          <div className="profile">
            <h1>No Profile Found</h1>
          </div>
        </body>);
      }
      else{
        return (
          <div className="profile">
            <Container>
              <Row className="align-items-center py-5">
                <Col sm="6">
                <p className="mb-2">{service_type}</p>
                {//Editing name
                    (editing)?
                    ( <div> <p> Click to edit highlighted areas </p>
                      <h1> <span className="editable" contentEditable="true" suppressContentEditableWarning={true} onInput={
                      e => (e.currentTarget.textContent != null)? 
                            handleChange('name', e.currentTarget.textContent):({})}> {job.name} </span> </h1>
                      </div>):(
                        <h1 className="text-left opportunity-page-title mb-2" >{job.name}</h1>
                      )
                  }
                {(() => {
                  if(poster === undefined){
                    return <Card.Text>Posted by an unknown user </Card.Text>
                  }
                  else{
                    return  <Link to={"/organizer/"+poster.id}> 
                            <Card.Text> <span className="postedBy"> Posted by 
                                        <span><Card.Img className="avatar" src={poster.picture}/></span>  
                                        <u>{poster.name}</u></span> </Card.Text> </Link>
                  }
                  })()} 
                
                    {//Editing location
                    (editing)?
                    ( <div>
                      <p> <span><IoLocationSharp size={30}></IoLocationSharp></span>  <span className="editable" contentEditable="true" suppressContentEditableWarning={true} onInput={
                      e => (e.currentTarget.textContent != null)? 
                            handleChange('location', e.currentTarget.textContent):({})}> 
                             {job.location} </span> </p>
                      </div>):(
                        <p className="mb2"> <span><IoLocationSharp size={30}></IoLocationSharp></span> {job.location} </p>
                      )
                  }
                <p className="mb-2">
                  <span><IoCalendarClear size={30}></IoCalendarClear></span> {job.start_year}/{job.start_month}/{job.start_day} - {job.end_year}/{job.end_month}/{job.end_day}
                </p>

                </Col>
                <Col sm="2">
                </Col>
                <Col sm="4" >
                  <div>
                    <div>
                      <Row className="align-items-center">
                        <Col>
                          <Button className="contactButton green" 
                          onClick={() => {
                          if (props.currentUser != undefined){
                            sendMail(poster.email)
                          } else {
                            handleTooltipOpen()
                          }}}
                          style={{ backgroundColor: contactActive ? "#c7ffe4" : "#00bc61", borderColor: contactActive ? "#c7ffe4" : "#00bc61", color: contactActive ? "#00bc61" : "white" }}> Get in Touch</Button>
                        </Col>
                        <Col>
                          <Button className="beige"> <FiShare2 size={"20px"} color="black" strokeWidth={"2.5px"}></FiShare2>  </Button>
                        </Col>
                      </Row>
                      <Row className = "edit-del">
                      <Modal overlayClassName="contactOverlay" className="contactModal" isOpen={showModal} onRequestClose={toggleModal} contentLabel="test"> 
                        <div> <b> Are you sure you want to delete this job? </b> </div> 

                        <div className= "modal-buttons">
                         <button className="edit-button"  onClick={toggleModal}> Nevermind </button>
                         <Link to="/"> <button className="delete-button" onClick={handleDelete}> Yes, delete </button>  </Link>
                        </div>

                      </Modal>
                      <Col>
                      {// Edit button visible if logged-in user is viewed user
                      ((props.currentUser != undefined) && (props.currentUser.id == poster.id))?
                      ((editing)? (<Button className="edit-button" onClick=
                                     {() => {
                                       handleClick(editing, setEditing);
                                       handleSubmitEdits();
                                     }
                                     }> Save Changes</Button>
                                   ): (
                                     <Button className="edit-button" onClick=
                                         {() => 
                                         { handleClick(editing, setEditing);
                                           createEditableJob();}
                                         }> Edit Job </Button>
                         )):(<p></p>)}
                         </Col>
                         <Col>
                     {// Delete button visible if logged-in user is viewed user
                     ((props.currentUser != undefined) && (props.currentUser.id == poster.id))?
                     ((<Button className="delete-button" onClick={toggleModal}> Delete Job </Button>
                                  )):(<p></p>)}
                        </Col>
                      </Row>
                      
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex">
              <Button 
    
              className = "nav-btn"
              style={{ backgroundColor: "#FFEFDE", borderColor:"#FFEFDE", color: "black" }}
              >Details</Button>
            </div>
            </Container>
    
            <div className="content-div">
             <OpportunitySection job={job} poster = {poster} talentList={props.talentList} idToIndex={props.idToIndex} editing={editing} handleChange={handleChange} ></OpportunitySection>
            </div>
            
            
          </div>
  
      );
      }
      
  
  }

  
}
