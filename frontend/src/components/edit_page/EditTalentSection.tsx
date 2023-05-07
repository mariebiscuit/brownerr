import { EditableUser, User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import UserWrapper from "../main_page/UserWrapper";
import { useEffect, useState } from "react";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface TalentProps {
  user: User;
}

const [data, setData] = useState<Map<string, string>>(new Map())

const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    // take data to submit
  };

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function EditTalentSection(props: TalentProps) {

    useEffect(() => {
        setData(new Map([['bio', props.user.bio], ['name', props.user.name], ['picture', props.user.picture]]))
    }, [])

  // const lastNameChar: string = props.user.lastName.slice(0,1)
  return (
    <div >
      <Container>
        <Row>
          <Col className="px-5" sm="6">
            <form onSubmit = {handleSubmit}>
            <div className="mb-4">
              <h2>Overview</h2>
              <input type="text" name="overview" value={data.get('bio')} onChange = {handleChange}/>
            </div>
            <button type="submit">
                Submit
            </button>

            <div className="mb-4">
              <h2>Works/Portfoliio</h2>
              <p>add carousel here</p>
            </div>

            <div className="mb-4">
              <h2>Availability</h2>
              <p>add calendar here</p>
            </div>
            </form>
          </Col >
          <Col className="px-5" sm="6">
            <div className="mb-4">
                <h2>Reviews</h2>
                <p>add reviews of talent type here</p>
            </div>
        </Col>
        </Row>
      </Container>
    </div>
  );

}
