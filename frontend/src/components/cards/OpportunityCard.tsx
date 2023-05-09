import { useEffect, useState } from "react";
import { Opportunity, User } from "../../Utilities";
import Card from 'react-bootstrap/Card';
import {IoLocationSharp, IoCalendarClear} from "react-icons/io5";
import { Link } from "react-router-dom";


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
  const [poster, setPoster] = useState<User>();
  const [service_type, setType] = useState<string>();
  const idString : string = props.job.id.toString();

  useEffect(() => {
    async function getDataUser(id:string ) {

    
      const response = await fetch(
        `http://localhost:2000/user/id/${id}/`
      ).then(response => response.json());
      
      const user : User = response
      setPoster(user)
     }

   getDataUser(props.job.poster)
 }, [])
 

 useEffect(() => {
  async function getServiceType(id:number) {
    const response = await fetch(
      `http://localhost:2000/service/${id}/`
    ).then(response => response.json());
    
    const service : string = response.service
    setType(service)
    }

 getServiceType(props.job.job)
}, [])
  
 

  

  
  return (
    <Card className="opportunity-card">
      <Link to={"/opportunity/" + idString}>
    
      <Card.Body className="opportunity-card-body">
        <Card.Text style={{color: "#8A8A8A"}}>{service_type}</Card.Text>
        <Card.Title className="text-left opportunity-card-title" >{props.job.name}</Card.Title>
        {(() => {
            if(poster === undefined){
              return <Card.Text>Posted by an unknown user </Card.Text>
            }
            else{
              return  <Card.Text>Posted by <span><Card.Img className="avatar" src={poster.picture} /></span> <u>{poster.name} </u> </Card.Text>
            }
            })()} 
       
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
          {/* <span><IoCalendarClear size={36}></IoCalendarClear></span> {props.job.start_day.toString()}/{props.job.start_month.toString()}/{props.job.start_year.toString()} - {props.job.end_day.toString()}/{props.job.end_month.toString()}/{props.job.end_day.toString()} */}
          <span><IoCalendarClear size={36}></IoCalendarClear></span> {String(props.job.start_month)}/{String(props.job.start_day)}/{String(props.job.start_year)} - {String(props.job.end_month)}/{String(props.job.end_day)}/{String(props.job.end_year)}
        </Card.Text>
    
    
        
      
      </Card.Body>
      </Link>
    </Card>
  );

}
