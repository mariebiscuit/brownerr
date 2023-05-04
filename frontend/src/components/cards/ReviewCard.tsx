import { Review, User } from "../../Utilities";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {GiRoundStar} from "react-icons/gi"



/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface ReviewProps {
  review: Review;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function ReviewCard(props: ReviewProps) {
  const lastNameChar: string = props.review.user.lastName.slice(0,1)
  return (
    <Card className="align-items-center review-card">
    
     
      <Card.Body >
        
          <Row className="align-items-center">
            <Col sm="3"> 
              
              <Card.Img variant="top" className="review-card-img" src={props.review.user.profilePicPath} />
            
            </Col>
              
            <Col sm="9" className="py-2">
            
                  <Row className="align-items-center"> 
                    <Col xs="8">
                      <Card.Title style={{fontWeight:"900"}}>"{props.review.title}"</Card.Title>
                    </Col>

                    <Col xs="4">
                      <Card.Text style={{color:"#FF7A00", fontWeight:"900"}}>{props.review.rating}/5 <GiRoundStar size={"20px"}></GiRoundStar></Card.Text>
                    </Col>


                  </Row>
                  <p>{props.review.content}</p>
        
            

                  
            </Col>
              
          </Row>

        
        

      
      </Card.Body>
    </Card>
  );

}
