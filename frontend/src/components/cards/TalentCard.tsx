import { User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Link } from "react-router-dom";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface TalentCardProps {
  user: User;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function TalentCard(props: TalentCardProps) {

  
  const idString : string = props.user.id.toString();
  return (
    
      <Card className="talent-card">
        <Link to={"/talent/" + idString}> 
        {(() => {
            switch(props.user.available_provider) {
              case 2: return <Button className="availability green"><AiOutlineSmile size={20} className="avail-icons"></AiOutlineSmile> Open to Work</Button> ;
              case 1: return <Button className="availability orange"><AiOutlineMeh size={20} className="avail-icons"></AiOutlineMeh> Slightly Busy</Button> ;
              case 0: return <Button className="availability red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> ;
              default: return <Button className="availability red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> 
            }
          })()} 
      
        <Card.Img variant="top" className="talent-card-img" src={props.user.picture} />
        <Card.Body className="talent-card-body">
        

          {/* {(() => {
            switch(lastNameChar) {
              case "": return  <Card.Title className="text-left talent-card-title" >{props.user.firstName}</Card.Title> ;
              default: return  <Card.Title className="text-left talent-card-title" >{props.user.firstName} {lastNameChar}.</Card.Title>
            }
          })()} */}
          <Card.Title className="text-left talent-card-title" >{props.user.name}</Card.Title>
        
          {/* <Row className="px-3">
            <Col> <Button className="card-tag">{props.user.categories[0]}</Button> </Col>
            <Col> <Button className="card-tag">{props.user.subcategories[0]}</Button> </Col>
            <Col> <Button className="card-tag">{props.user.subcategories[1]}</Button></Col>
          </Row> */}
        
          
           
            
          <div className="talent-num-div" >
            <p className="text-left talent-num-title" >Star Rating:</p>
            <Rating initialValue={props.user.rating_provider} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>

          </div>
      
        
        </Card.Body>
        </Link>
      </Card>
   
  );

}
