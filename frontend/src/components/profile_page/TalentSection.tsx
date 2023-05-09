import { User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { URLPREFIX } from "../../Utilities";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface TalentProps {
  editing: boolean;
  user: User;
  currentUser: User | undefined;
  currentCredential: string | undefined;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function TalentSection(props: TalentProps) {

  const [data, setData] = useState<Map<string, string>>(
    new Map([['bio', props.user.bio], ['name', props.user.name], ['picture', props.user.picture]]))

  function handleChange(key: string, value: string){
    setData(new Map(data.set(key, value)));
  };

  function handleSubmit(){
      const bio = data.get('bio')
      if (bio !== undefined){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify({
          'credential': props.currentCredential,
          'bio': bio})
      }
      fetch(URLPREFIX + "user/update/" + props.user.id, requestOptions).then(
        response => response.json()).then(data => {
          (data.get('code') == 200)? (
            {}):({})
          })
    }
  };

  
  // const lastNameChar: string = props.user.lastName.slice(0,1)
  return (
    <div >
      <Container>
        <Row>
          <Col className="px-5" sm="6">
            <div className="mb-4">
              <h2>Overview</h2>
              {(props.editing)?
              (<p className="overview" contentEditable="true" onInput={
                  e => (e.currentTarget.textContent != null)? 
                        handleChange('bio', e.currentTarget.textContent):({})
                }>
                {props.user.bio} </p>):
              (<p className="content-text">{props.user.bio}</p>)}

              {/* <p className="content-text">{props.user.overviews}</p> */}


            </div>

            <div className="mb-4">
              <h2>Works/Portfoliio</h2>
              <p>add carousel here</p>
            </div>

            <div className="mb-4">
              <h2>Availability</h2>
              <p>add calendar here</p>
            </div>
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
