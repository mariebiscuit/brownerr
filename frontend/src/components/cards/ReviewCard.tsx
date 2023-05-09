import { Review, User } from "../../Utilities";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {GiRoundStar} from "react-icons/gi"
import { useEffect, useState } from "react";




/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface ReviewProps {
  review: Review;
  idToIndex: Map<string, number>;
  talentList: User[];

}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function ReviewCard(props: ReviewProps) {
  const id = props.review.poster;
  var idx = -1;
  try{
    if (id != undefined){
      const initIdx = props.idToIndex.get(String(id))
      console.log(id)
      if (initIdx != undefined) {
        idx = initIdx;
      }
    }
  } catch{
    console.log("Could not find user")
  }
  
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser(props.talentList[idx])
    console.log(user)
  }, [idx]);



  return (
    <Card className="review-card">
    
     
      <Card.Body >
        
          <Row className="align-items-start">
            <Col sm="3"> 
            {(() => {
            if(user === undefined){
              return <Card.Img variant="top" className="review-card-img" src={"../../user2.jpeg"} />
            }
            else{
              return  <Card.Img variant="top" className="review-card-img" src={user.picture} />
            }
            })()} 
              
            
            </Col>
              
            <Col sm="9" className="py-2">
            
                  <Row className="align-items-center"> 
                    <Col xs="8">
                     
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
