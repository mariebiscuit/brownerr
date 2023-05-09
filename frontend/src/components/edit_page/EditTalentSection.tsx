import { EditableUser, User } from "../../Utilities";
import { getDataUser } from "../../App";
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
import { URLPREFIX } from "../../Utilities";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface TalentProps {
  user: User;
  currentCredential: string;
}


/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function EditTalentSection(props: TalentProps) {

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
      <form onSubmit = {(e) => {
              e.preventDefault();
              handleSubmit()}}>
        <Row>
          <Col className="px-5" sm="6">
            <div className="mb-4">
              <h2>Overview</h2>
              <div className="overview" contentEditable="true" onInput={
                e => (e.currentTarget.textContent != null) ? 
                handleChange('bio', e.currentTarget.textContent):({})} >
                {props.user.bio}
            </div>

              {/* <textarea
                name="bio" 
                value={data.get('bio')} 
                onChange = {(e) => handleChange(e.target.name, e.target.value)}/> */}
            </div>
            <button type="submit">
                Submit
            </button>

            {/* <div className="mb-4">
              <h2>Works/Portfoliio</h2>
              <input type="text" 
                name="portfolio" 
                value={data.get('bio')} 
                onChange = {(e) => handleChange(e.target.name, e.target.value)}/>
              <p>add carousel here</p>
            </div> */}

            {/* <div className="mb-4">
              <h2>Availability</h2>
              <p>add calendar here</p>
            </div> */}
          </Col >
          <Col className="px-5" sm="6">
            <div className="mb-4">
                <h2>Reviews</h2>
                <p>add reviews of talent type here</p>
            </div>
        </Col>
        </Row>
        </form>
      </Container>
    </div>
  );

}
