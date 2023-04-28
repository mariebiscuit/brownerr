import { User } from "../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"


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

  return (
    <Card className="talent-card">
      {(() => {
          switch(props.user.availability) {
            case "open": return <Button className="availability green"><AiOutlineSmile size={20} className="avail-icons"></AiOutlineSmile> Open to Work</Button> ;
            case "moderate": return <Button className="availability orange"><AiOutlineMeh size={20} className="avail-icons"></AiOutlineMeh> Slightly Busy</Button> ;
            case "busy": return <Button className="availability red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> ;
            default: return <Button className="availability red"><AiOutlineFrown size={20} className="avail-icons"></AiOutlineFrown> Unavailable</Button> 
          }
        })()}
    
      <Card.Img variant="top" className="talent-card-img" src={props.user.profilePicPath} />
      <Card.Body className="talent-card-body">
        <Card.Title className="text-left talent-card-title" >{props.user.name}</Card.Title>
       
        <Row className="px-3">
          <Col> <Button className="card-tag">{props.user.categories[0]}</Button> </Col>
          <Col> <Button className="card-tag">{props.user.subcategories[0]}</Button> </Col>
          <Col> <Button className="card-tag">{props.user.subcategories[1]}</Button></Col>
        </Row>
       
        <Row className="second-row-talent-card">
          <Col sm="5"> 
            <div className="talent-num-div" >
              <p className="text-left talent-num-title">Rate Per Hour:</p>
              <p className="talent-card-title" style={{fontSize: "20px"}}>${props.user.rate}</p>
            </div> 
          </Col >
            
          <Col sm="7">
            <div className="talent-num-div" >
              <p className="text-left talent-num-title" >Star Rating:</p>
              <Rating initialValue={props.user.rating} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>
   
            </div>
          </Col>

        </Row>


      
      </Card.Body>
    </Card>
  );

}
