
// export {handlers};
// import { State } from "./State";
// import APIFunctions from "./APIFunctions"
// import {csvFile as csvFile} from "./Utilities"
// import * as utils from "./Utilities"
// import { REPLFunction } from "./Utilities";


// let mode : REPLFunction; 
// let load : REPLFunction;
// let view : REPLFunction;
// let search : REPLFunction;
// const handlers = new Map<string, REPLFunction>([]); //map that holds string(command name) and its corresponding functions

// /**
//  * Function that handles mode change
//  * @returns new state after mode is changed
//  */
// mode = async function(state: State, commandParams: string[]) : Promise<State>{
//     var newState = state
   
//     if (commandParams.length != 0) {
//         newState.output = "Usage: mode";
//     }
//     else {
//         newState.verbose = !state.verbose
//         newState.output = "Toggled verbose to \"".concat(newState.verbose.toString(), "\"");
        
//     }
//     return newState;
// }

// /**
//  * Function that handles load file
//  * @returns new state after file is loaded
//  */
// load = async function(state: State, commandParams: string[]) : Promise<State>{
//     var newState = state
   
//     if (commandParams.length != 2) {
//         newState.output = "Usage: load_file [filepath] [hasHeaders?]";
//     }
//     else {
//         try {
//             //update fields
//             newState.filePath = commandParams[0];
//             const output : string = await APIFunctions.load_file(newState.filePath, commandParams[1])
//             newState.output = output
//         }
//         catch (e) {
//             // error-catch from load_file function
//             if (e instanceof Error) {
//                 newState.output = e.message;
//             }
//             else {
//                 newState.output = "Unknown error occured in load_file.";
//             }
//         }
//     }
//     return newState;
// }

// /**
//  * Function that handles view command
//  * @returns new state after view 
//  */
// view = async function(state: State, commandParams: string[]) : Promise<State>{
//     var newState = state
   
//     if (commandParams.length != 0) {
//         newState.output = "Usage: view";
//     } 
//     else if (newState.filePath == "" || newState.filePath == undefined ) {
//         newState.output =
//             'No loaded file: load the file first with the load_file command.';
//     }
//     else {
//         const output: csvFile | string = await APIFunctions.view_file()
//         if (output instanceof csvFile){
//             if (output.data.length == 0 && output.header.length ==0){
//                 newState.output = "No rows to show.";
//             } else {
//                 newState.output = "Displaying ".concat(newState.filePath, "."); // make table
//                 newState.additionalHTML= utils.dataToHTMLTable(output);
//                 newState.hasAdditionalHTML = true;
//             }
//         } else {
//             newState.output = output
//         }
//     }
//     return newState;
// }

// /**
//  * Function that handles search
//  * @returns new state after search
//  */
// search = async function(state: State, commandParams: string[]) : Promise<State>{
//     var newState = state
   
//     if (commandParams.length != 2) {
//         newState.output = "Usage: search [column] [value]";
//     }
//     else if (newState.filePath == "" || newState.filePath == undefined ) {
//         newState.output =
//             'No loaded file: load the file first with the load_file command".';
//     }
//     else {
//         try {
//             var column = commandParams[0].replace(/['"]+/g, '');
//             var query = commandParams[1].replace(/['"]+/g, '');
            
//             const output: csvFile | string = await APIFunctions.search_file(query, column)
//             if (output instanceof csvFile){
//                 if (output.data.length == 0){
//                     newState.output = "No matching results found.";
//                 } else {
//                 newState.output = "Showing rows matching \"".concat(query, "\" in column ").concat(column)
//                 newState.additionalHTML= utils.dataToHTMLTable(output);
//                 newState.hasAdditionalHTML = true;
//                 }
//             } else {
//                 newState.output = output
//             }
//         }
//         catch (e) {
//             // error-catch from search function
//             if (e instanceof Error) {
//                 newState.output = e.message;
//             }
//             else {
//                 newState.output = "Unknown error occured in search.";
//             }
//         }
//     }
//     return newState;
// }

// /**
//  * adds a new repl function to the existing map for program's use
//  * @param name function's command name
//  * @param func the REPLFunction
//  * @returns new map that is modified
//  */
// function addFunction(name: string, func: REPLFunction){
//     return handlers.set(name, func)
// }

// /**
//  * delete a repl function to the existing map for program's use
//  * @param name function's command name
//  * @param func the REPLFunction
//  * @returns new map that is modified
//  */

// function deleteFunction(name: string){
    
//     return handlers.delete(name)
    
    
// }


// function reset(){
//     handlers.clear()
//     addFunction("mode", mode); 
//     addFunction("view", view);
//     addFunction("load_file", load);
//     addFunction("search", search);
    
// }

// //adding the current functions into the map, the user can always delete existing ones, 
// //write new functions and add them for program's use here
// addFunction("mode", mode); 
// addFunction("view", view);
// addFunction("load_file", load);
// addFunction("search", search);


// export{addFunction, deleteFunction, reset}


 
 