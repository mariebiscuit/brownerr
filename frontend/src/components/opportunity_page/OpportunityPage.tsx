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
import OrganizerSection from "./OpportunitySection";
import {IoLocationSharp, IoCalendarClear} from "react-icons/io5"
import OpportunitySection from "./OpportunitySection";
import { useParams } from "react-router-dom";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface OpportunityProps {
  jobList: Opportunity[];

}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OpportunityPage(props: OpportunityProps) {
  const {id} = useParams();
  var jobID = -1;
  try{
    jobID = Number(id);
  }
  catch{
    console.log("could not find user")
  }
  
  const [job, setJob] = useState<Opportunity>();
  useEffect(() => {
     setJob(props.jobList[jobID-1])
  }, [id]);

  const [contactActive, setContactActive] = useState(false);
  const handleClick = (variable: boolean, setter: (newVar: boolean) => void) => {
    setter(!variable)
  }

  if(job === undefined){
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
              <p className="mb-2">{job.type} - {job.category} - {job.subcategory}</p>
              <h1 className="text-left opportunity-page-title mb-2" >{job.name}</h1>
              <p className="mb-5">Posted by <span><Card.Img className="avatar" src={job.poster.profilePicPath} /></span> <u>{job.poster.firstName} {job.poster.lastName}</u> </p>
              
              <p className="mb-2">
                <span><IoLocationSharp size={30}></IoLocationSharp></span> {job.location}
              </p>
  
              <p className="mb-2">
                <span><IoCalendarClear size={30}></IoCalendarClear></span> {job.startDate.year}/{job.startDate.month}/{job.startDate.date} - {job.endDate.year}/{job.endDate.month}/{job.endDate.date}
              </p>
                
          
              </Col>
              <Col sm="2">
              </Col>
              <Col sm="4" >
                <div>
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
  
            className = "nav-btn"
            style={{ backgroundColor: "#FFEFDE", borderColor:"#FFEFDE", color: "black" }}
            >Details</Button>
          
          </div>
          </Container>
  
          <div className="content-div">
           <OpportunitySection job={job}></OpportunitySection>
          </div>
          
          
        </div>

    );
  
  }

  
}
