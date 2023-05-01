import { Opportunity, User } from "../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {IoLocationSharp, IoCalendarClear} from "react-icons/io5"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface OpportunityCardProps {
  job: Opportunity;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OpportunityCard(props: OpportunityCardProps) {

  return (
    <Card className="opportunity-card">
      <Card.Body className="opportunity-card-body">
        <Card.Text style={{color: "#8A8A8A"}}>{props.job.type} - {props.job.category} - {props.job.subcategory}</Card.Text>
        <Card.Title className="text-left opportunity-card-title" >{props.job.name}</Card.Title>
        <Card.Text>Posted by <span><Card.Img className="avatar" src={props.job.poster.profilePicPath} /></span> <u>{props.job.poster.name}</u> </Card.Text>
        <hr
        style={{
            color: "#A8A8A8",
            backgroundColor: "#A8A8A8",
            height: 3,
            borderColor : '#A8A8A8'
        }}/>
        <Card.Text>
          <span><IoLocationSharp size={36}></IoLocationSharp></span> {props.job.location}
        </Card.Text>

        <Card.Text>
          <span><IoCalendarClear size={36}></IoCalendarClear></span> {props.job.startDate.year}/{props.job.startDate.month}/{props.job.startDate.date} - {props.job.endDate.year}/{props.job.endDate.month}/{props.job.endDate.date}
        </Card.Text>
    
    
        
      
      </Card.Body>
    </Card>
  );

}
