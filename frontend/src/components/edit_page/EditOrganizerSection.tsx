import { User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";


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
export default function EditOrganizerSection(props: OrganizerProps) {
  
  return (
    <div>
      <Container>
        <Row>
          <Col className="px-5" sm="6">
            <div className="mb-4">
              
              <h2>add jobs posted by the user here</h2>
            </div>

      
          </Col >
          <Col className="px-5" sm="6">
            <div className="mb-4">
                <h2>Reviews</h2>
                <p>add reviews of organizer type here</p>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );

}
