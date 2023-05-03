import { Opportunity, Review, User } from "../../Utilities";
import Card from 'react-bootstrap/Card';


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface StatsProps {
  job: Opportunity;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function StatsCard(props: StatsProps) {
  const length = props.job.applicants.length;
  let content;
  if (length === 0){
    content = <div> <p>No one has expressed interest</p></div>
  }
  else if (length < 9){
    const avartars = []
    for(let i = 0; i < length; i++){
     
        
        avartars.push(<Card.Img  className="avatar-stats" style={{marginLeft:-20}} src={props.job.applicants[i].profilePicPath} />)
    }
    content = <div><div className="stats-div mb-4"> {avartars} </div> <p>{length} people have reached out</p></div>
  }
  else{
    const avartars = []
    for(let i = 0; i < 9; i++){
       
        avartars.push(<Card.Img  className="avatar-stats" src={props.job.applicants[i].profilePicPath} style={{marginLeft:-20}}/>)
    }
    content = <div><div className="stats-div mb-4"> {avartars} </div> <p>{length} people have reached out</p></div>
  }
  return (
    <Card className="stats-card">
    
     
      <Card.Body >
        
          {content}
        
        

      
      </Card.Body>
    </Card>
  );

}
