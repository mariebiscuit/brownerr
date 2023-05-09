import { Review, User } from "../../Utilities";
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
import ReviewCard from "../cards/ReviewCard";


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
  talentList: User[];
  idToIndex: Map<string, number>;
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
  
  const [reviews, setReviews] = useState<Review[]> ([]);

  useEffect(() => {
    async function getDataReviews() {
     const response = await fetch(
       `http://localhost:2000/user/recipient/${props.user.id}/transactions/`
     ).then(response => response.json());
     
     const reviewsNew : Review[] = []
     
     response.forEach((item:any) => {
      const rev: Review =  {rating: item.rating_provider, content: item.review_provider, poster: item.recipient_id} 
      reviewsNew.push(rev)
    })

    setReviews(reviewsNew)
     
   }

   getDataReviews()
 }, [])

  
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
                {(() => {
                  if(reviews.length === 0){
                    return <p className="py-5">No reviews</p>
                  }
                  else{
                    return (<div>
                      {reviews.map((item) => ( 
                        <ReviewCard review={item} idToIndex={props.idToIndex} talentList={props.talentList}/>
                                        ))}
                      </div>)
                  }
                  })()} 
                
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );

}
