import { EditableUser, ServiceType, User } from "../../Utilities";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import UserWrapper from "../main_page/UserWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { URLPREFIX } from "../../Utilities";
import { Height } from "@mui/icons-material";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface JobProps {
  user: User;
  serviceList: ServiceType[];
  toggleModal: () => void;
  triggerDbUpdate: () => void;
}


/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function CreateJobOverlay(props: JobProps) {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const [jobID, setJobID] = useState<string>()
  const [data, setData] = useState<Map<string, string>>(
    new Map([['job', ''], ['name', ''], ['poster', props.user.id], ['location', 'TBD'], ['start_day', `${date}`], ['start_month', `${month}`], ['start_year', `${year}`], ['end_day', `${date}`], ['end_month', `${month}`], ['end_year', `${year}`], ['overview', '']]))

  function handleChange(key: string, value: string){
    setData(new Map(data.set(key, value)));
  };
  
  function handleClick(key: string, value: string, setter: (newVar: string) => void){
    setData(new Map(data.set(key, value)));
    setter(value)
  };

 

  function handleSubmit(){
      
      const job = data.get('job')
      const name = data.get('name')
      const location = data.get('location')
      const start_day = data.get('start_day')
      const start_month = data.get('start_month')
      const start_year = data.get('start_year')
      const end_day = data.get('end_day')
      const end_month = data.get('end_month')
      const end_year = data.get('end_year')
      const overview = data.get('overview')
      
      
      if(job !== '' && name !== '' && location !== ''){

      
      const requestOptions = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'job': job,
          'name': name,
          'poster': props.user.id,
          'location': location,
          'start_day': start_day,
          'start_month': start_month,
          'start_year': start_year,
          'end_day': end_day,
          'end_month': end_month,
          'end_year': end_year,
          'overview': overview})
      }
      fetch(URLPREFIX + "job/create/", requestOptions).then(
        response => response.json()).then(data => {
        console.log(data['code']);
         if (data['code'] == 200){
            console.log('triggered');
            props.triggerDbUpdate()
            
         }})
      }
    };

  // const lastNameChar: string = props.user.lastName.slice(0,1)
  return (
    <div>
      <Container>
      <Row className="align-items-end">
        <Col sm="8">
        <form onSubmit = {(e) => {
              e.preventDefault();
              handleSubmit()}}>
      
      <h4>Job Title*</h4>
      <input type="text" 
                name="name" 
                value={data.get('name')} 
                className="long" 
                onChange = {(e) => handleChange(e.target.name, e.target.value)}/>
      

      <h4>Location*</h4>
      <input type="text" 
                name="location" 
                value={data.get('location')}
                className="long" 
                onChange = {(e) => handleChange(e.target.name, e.target.value)}/>

      <h4>Start Date and End Date*</h4>
      <div className="mb-3">
      <span>Start Date: <input type="number" 
                name="start_year" 
                value={data.get('start_year')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/>/<input type="number" 
                name="start_month" 
                value={data.get('start_month')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/>/<input type="number" 
                name="start_day" 
                value={data.get('start_day')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/></span>
      </div>
      
      <div>
      <span>End Date:  <input type="number" 
                name="end_year" 
                value={data.get('end_year')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/>/<input type="number" 
                name="end_month" 
                value={data.get('end_month')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/>/<input type="number" 
                name="end_day" 
                value={data.get('end_day')} 
                onChange = {(e) => handleChange(e.target.name, String(e.target.value))}
                className="fit-content"/></span>
      </div>
      

      <h4>Job Type</h4>
      <div>
      {props.serviceList.map((type) => ( 
                                    <Button 
                                    onClick={() => (jobID !== String(type.id)) ? handleClick('job', String(type.id), setJobID):void(0)}
                                    className =  {(jobID !== String(type.id)) ? "type-select-btn": "type-select-btn-selected" }>{type.service}</Button>
                                  ))}
      </div>
      
      <h4>Overview</h4>
      <div>
      <input type="text" 
                name="overview" 
                className="long" 
                value={data.get('overview')} 
                onChange = {(e) => handleChange(e.target.name, e.target.value)}
                style={{minHeight: 100}}/>
      
      </div>
   
      
      
     
      </form>
      </Col>

      <Col sm="4">
      <Button onClick={()=>{handleSubmit(); props.toggleModal();}} variant="success" className="submit-btn" style={{width:"60%"}}>Submit</Button>
      <Button onClick={props.toggleModal} variant="secondary" className="submit-btn" style={{width:"30%"}}>Cancel</Button>
      
      </Col>
      </Row>
      


      </Container>
    </div>
  );

}
