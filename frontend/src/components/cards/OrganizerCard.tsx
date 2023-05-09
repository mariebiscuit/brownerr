import { User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {MdGroups3, MdPerson} from "react-icons/md"
import { Link } from "react-router-dom";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface OrganizerProps {
  user: User;

}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OrganizerCard(props: OrganizerProps) {
  const idString : string = props.user.id.toString();
  return (
    <Card className="organizer-card">
     
    
      <Link to={"/organizer/" + idString}>
      <Card.Body className="talent-card-body">
      
        <Row className="row-organizer-card">
          <Col sm="5"> 
            
            <Card.Img variant="top" className="organizer-card-img" src={props.user.picture} />
            {/* {(() => {
            switch(props.user.isOrganization) {
              case true: return <Button className="organizer-type green"><MdGroups3 size={20} className="avail-icons"></MdGroups3> Organization</Button> ;
              default: return <Button className="organizer-type orange"><MdPerson size={20} className="avail-icons"></MdPerson> Individual</Button> 
            }
            })()} */}
          </Col >
            
          <Col sm="7">
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
              
            </Row>

            <Row className="px-3">
              <Col> <Button className="card-tag">{props.user.subcategories[1]}</Button></Col>
              <Col></Col>
            </Row> */}

            <div className="talent-num-div mt-5" >
              <p className="text-left talent-num-title" >Star Rating:</p>
              <Rating initialValue={props.user.rating_recipient} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>
   
            </div>
          </Col>

        </Row>


      
      </Card.Body>
      </Link> 
    </Card>
  );

}
