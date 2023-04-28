// import { useState } from "react";
// import { State } from "../State";
// import { REPLFunction } from "../Utilities";

// /**
//  * Variables needed for the input box
//  * it includes a handler map that contains REPLFunction and its call command
//  * a list a states and its setter to be updated after each submit
//  * currentState of the program  and its setter 
//  */
// interface InputBoxProps {
//   handlers: Map<String, REPLFunction>;
//   states: State[];
//   setStates: (newStates: State[]) => void
  
//   currentState: State;
//   setCurrentState: (newState : State) => void
// }

// /**
//  * Defines functionality and renders the inputbox
//  * @param props InputBoxProps mentioned above
//  * @returns a new InputBox as functional HTML Element
//  */
// export default function InputBox(props: InputBoxProps) {
//   const [textBox, setTextbox] = useState(""); //keep track of user input

//   /**
//    * function that handles the event of submit button press
//    */
//   async function handleSubmit(){
//     // tokenize command
//     var regex = /(?:[^\s"]+|"[^"]*")+/g;
//     const regex_arr: RegExpMatchArray | null = textBox.match(regex);

//     // type narrow for regex array
//     var input_arr: string[];
//     if (regex_arr == null) {
//       input_arr = []
//     } else {
//       input_arr = regex_arr
//     }
//     // extract command string
//     var command: string = input_arr[0]
//     // command params will exclude command itself
//     var commandParams: string[] = input_arr.slice(1)
    
//     //refresh newState
//     var newState: State = Object.create(props.currentState);
//     newState.additionalHTML = "";
//     //store user input into history in case of verbose usage
//     newState.input = textBox;
//     //default that the state has not additional HTML, subject to change
//     newState.hasAdditionalHTML = false;

//     if(props.handlers.has(command)){  //check if command in hander
//       try {
//         var func = props.handlers.get(command);

//         if(func === undefined){  //check if function exists
//           newState.output = ("Please enter a valid command");
          
//         }
//         else{
//           newState = await func(newState, commandParams); //try the corresponding method
//         }

//       } catch (e) {
//         if (e instanceof Error) {
//           newState.output = (e.message);
          
//         } else {
//           throw e;
//         }
//       }
//     } 
//     else {
//       newState.output = "Please enter a valid command";
      
//     }
//     props.setStates([Object.create(newState), ...props.states]) //update list of states (for historyBox's usage)
//     props.setCurrentState(Object.create(newState)) //update the current state
//     setTextbox(""); //clear textbox
//   }

//   return (
//     <div role='search' className="repl-input" aria-label="contains input box and submit button">
      
//       <input 
//       aria-label = "enter command"
//       placeholder= "enter commands here"
//       type="text" 
//       onChange={(e) => setTextbox(e.target.value)} 
//       value = {textBox}
//       accessKey = "e"
//       className="repl-command-box" 
//       id ="input"
//       onKeyUp = {(e) => {
//         if (e.key == "Enter"){
//           handleSubmit()
//         }
//       }}
//       />
//       <button className="repl-button"
//               aria-label="submit command"
//               accessKey = "s"
//         // onClick = {() => handleSubmit()}
//         onClick = {handleSubmit}
//         >
//         Submit
//       </button>
//     </div>
//   );

// }
