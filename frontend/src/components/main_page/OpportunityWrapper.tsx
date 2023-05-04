import { Opportunity, User } from "../../Utilities";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rating } from 'react-simple-star-rating'
import {GiRoundStar} from "react-icons/gi"
import {AiOutlineSmile, AiOutlineFrown, AiOutlineMeh} from "react-icons/ai"
import { Container } from "react-bootstrap";
import TalentCard from "../cards/TalentCard";
import OrganizerCard from "../cards/OrganizerCard";
import OpportunityCard from "../cards/OpportunityCard";


/**
 * Variables needed for the input box
 * it includes a handler map that contains REPLFunction and its call command
 * a list a states and its setter to be updated after each submit
 * currentState of the program  and its setter 
 */
interface WrapperProps {
  data: Opportunity[];
  mode: string;
}

/**
 * Defines functionality and renders the inputbox
 * @param props InputBoxProps mentioned above
 * @returns a new InputBox as functional HTML Element
 */
export default function OpportunityWrapper(props: WrapperProps) {
  
  return <div>

          {(() => {
            switch(props.mode) {
              case "opportunities":  return <div className="wrapper">
                                        {props.data.map((item) => ( // TODO: map bakeryData to BakeryItem components
                                          <OpportunityCard job={item}/> // replace with BakeryItem component
                                        ))}
                                    </div>;
              
              default: return <div className="wrapper">
                                  {props.data.map((item) => ( // TODO: map bakeryData to BakeryItem components
                                    <OpportunityCard job={item}/> // replace with BakeryItem component
                                  ))}
                              </div>;
            }
          })()}
  </div>
  
 

}
