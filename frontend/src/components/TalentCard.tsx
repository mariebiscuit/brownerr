import { User } from "../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" className="card-img" src={props.user.profilePicPath} />
      <Card.Body className="talent-card-body">
        <Card.Title >{props.user.name}</Card.Title>
       
        <Row>
          <Col sm="4"> <Button className="card-tag">{props.user.categories[0]}</Button> </Col>
          <Col sm="4"> <Button className="card-tag">{props.user.subcategories[0]}</Button> </Col>
          <Col sm="4"> <Button className="card-tag">{props.user.subcategories[1]}</Button></Col>
        </Row>
       
        <Row>
          <Col sm="4"> 
            <div>
              <p>Rate per Hour:</p>
              <p>${props.user.rate}</p>
            </div> 
          </Col>
          
          <Col sm="8">

          </Col>

        </Row>


      
      </Card.Body>
    </Card>
  );

}
