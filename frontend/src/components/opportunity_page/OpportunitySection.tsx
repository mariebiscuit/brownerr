import { Review, User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import { Opportunity } from "../../Utilities";
import ReviewCard from "../cards/ReviewCard";
import StatsCard from "../cards/StatsCard";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface JobProps {
  job: Opportunity;

}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OpportunitySection(props: JobProps) {
  const dummyUser : User = { firstName: "Gus",
                              lastName: "Janefa",
                              isOrganization: false,
                            profilePicPath: "../user2.jpeg",
                            categories: ["Music"],
                            subcategories: ["DJ", "Performance"],
                              bio: `Brown 2024, Offer DJ service at parties`,
                              rate: 12,
                              rating: 4,
                              availability: "open",
                              overviews: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
                              mediaPath: "",
                              reviews: [],
                              isOrganizer: false,
  
  };
  const dummyReview : Review = {rating: 3.5, content: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent.",
  title: "great organizer", user: dummyUser, type: "org"

  };
  const responsibilities = props.job.responsibility;
  const listItemsRes = responsibilities.map((res) =>
  <li className="mb-2">{res}</li>
  );

  const qualifications = props.job.qualification;
  const listItemsQua = qualifications.map((qua) =>
  <li className="mb-2">{qua}</li>
  );
  return (
    <div>
      <Container>
        <Row>
          <Col className="px-5" sm="6">
            <div className="mb-4">
              
              <h2>Overview</h2>
              <p>{props.job.overview}</p>
            </div>

            <div className="mb-4">
              
              <h2>Responsibilities</h2>
              <ul>{listItemsRes}</ul>
            </div>

            <div className="mb-4">
              
              <h2>Qualifications</h2>
              <ul>{listItemsQua}</ul>
            </div>


      
          </Col >
          <Col className="px-5" sm="6">
          <div className="mb-4">
                <h2>Opportunity Stats</h2>
                <StatsCard job={props.job}></StatsCard>
              </div>

              <div className="mb-4">
                <h2>Organizer Rating</h2>
                <div className="stars-bg">
                <Rating initialValue={props.job.poster.rating} allowHover={false} fillColor= {"#FF7A00"} disableFillHover={true} fillIcon={<GiRoundStar size={32}/>} emptyIcon={<GiRoundStar size={32}/>} className="talent-card-stars"/>
   
                </div>
              </div>
            <div className="mb-4">
                <h2>Reviews</h2> {/** Have to be fetched from the api */}
                
                <ReviewCard review={dummyReview}></ReviewCard>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );

}
