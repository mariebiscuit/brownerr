import { Opportunity, Review, User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReviewCard from "../cards/ReviewCard";
import OpportunityCard from "../cards/OpportunityCard";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface OrganizerProps {
  user: User;
  talentList: User[];
  idToIndex: Map<string, number>;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OrganizerSection(props: OrganizerProps) {
  const [reviews, setReviews] = useState<Review[]> ([]);

  useEffect(() => {
    async function getDataReviews() {
     const response = await fetch(
       `http://localhost:2000/user/recipient/${props.user.id}/transactions/`
     ).then(response => response.json());
     
     const reviewsNew : Review[] = []
     
     response.forEach((item:any) => {
      const rev: Review =  {rating: item.rating_recipient, content: item.review_recipient, poster: item.provider_id} 
      reviewsNew.push(rev)
    })

    setReviews(reviewsNew)
     
   }

   getDataReviews()
 }, [])

 const [jobs, setJobs] = useState<Opportunity[]> ([]);

  useEffect(() => {
    async function getDataOpportunity() {
     const response = await fetch(
       `http://localhost:2000/user/${props.user.id}/jobs`
     ).then(response => response.json());
     
    const jobsNew : Opportunity[] = response
    

    setJobs(jobsNew)
     
   }

   getDataOpportunity()
 }, [])

  
  
  return (
    <div>
      <Container>
        <Row>
          <Col className="px-5" sm="6">
            <div className="mb-4">
              
            {(() => {
                  if(jobs.length === 0){
                    return <p className="py-5">No jobs posted</p>
                  }
                  else{
                    return (<div>
                    {jobs.map((item, index) => ( 
                                       <OpportunityCard job={item} key={index}/>
                                      ))}
                    </div>)
                  }
                  })()} 
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
                    {reviews.map((item, index) => ( 
                                        <ReviewCard review={item} idToIndex={props.idToIndex} key={index} talentList={props.talentList}/>
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
