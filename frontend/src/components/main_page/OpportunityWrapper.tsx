import { Opportunity, User } from "../../Utilities";
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
