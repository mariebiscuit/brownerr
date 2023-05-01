import { User } from "../Utilities";
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
interface ProfileProps {
  user: User;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function ProfilePage(props: ProfileProps) {

  return (
    <body>
      <div>
        <Container>
          <Row>
            <Col sm="6">
              <Row>
                <Col>
                  <Card.Img className="avatar-big" src={props.user.profilePicPath} />
                </Col>
                <Col className="text-left">
                  <h1><span>{props.user.firstName} </span> <span className="ultra-thin">{props.user.lastName}</span></h1>
                  <p>{props.user.bio}</p>
                </Col>
              </Row>
              
            </Col>
            <Col sm="3">
            </Col>
            <Col sm="3">
            </Col>
          </Row>
        </Container>
        
      </div>
    </body>
  );

}
