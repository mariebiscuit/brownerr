// //import { csvFile } from "./Utilities";

// //url of backend server
// const url: String = "http://localhost:8080/"

// /**
//  * Attempting loadFile from the backend API
//  * @param filename the filepath of file loaded
//  * @param headers true or false string input indicating whether the file has headers 
//  * @returns a promise of a string, which could be success or failure message
//  */
// async function load_file(filename: string, headers: string): Promise<string> {
//     const getFetch = await fetch(
//         url.concat("loadcsv?filepath=").concat(filename)
//         .concat("&headers=").concat(headers.toString()))

//     const code: number = getFetch.status;
//     if (code == 200){
//         const json = await getFetch.json()
//         if (json['result'] == 'success'){
//             return "Successfully loaded ".concat(filename)
//         }
//         else {
//             return json['message']
//         }
//     } else {
//         return "Unknown error occured."
//     }  
// };

// /**
//  * Attempting view file from backend api
//  * @returns output of the backend API
//  */
// async function view_file(): Promise <csvFile | string> {
//     const getFetch = await fetch(url.concat("viewcsv"))
//     const code: number = getFetch.status;
//     if (code == 200){
//         const json = await getFetch.json()
//         if (json['result'] == 'success'){
//             const output: csvFile = new csvFile(json['headers'].length != 0, json['headers'], json['data'])
//             return output
//         }
//         else {
//             return json['message']
//         }
//     } else {
//         return "Unknown error occured."
//     }  
// }

// /**
//  * Attempting to search items in the file with backend API
//  * @param query the target string the user wants to find
//  * @param column a column identifier, could be column name or number
//  * @returns the backend API output
//  */
// async function search_file(query: string, column?: string): Promise<csvFile | string> {
//     var getFetch;
//     if (typeof column !== 'undefined'){
//         getFetch = await fetch(
//             url.concat("searchcsv?query=").concat(query)
//             .concat("&column=").concat(column))
//     } else {
//         getFetch = await fetch(
//             url.concat("searchcsv?query=").concat(query))

//     }

//     const code: number = getFetch.status;
//     if (code == 200){
//         const json = await getFetch.json()
//         if (json['result'] == 'success'){
//             const output: csvFile = new csvFile(json['headers'].length != 0, json['headers'], json['data'])
//             return output
//         }
//         else {
//             return json['message']
//         }
//     } else {
//         return "Unknown error occured."
//     }  
// };

// // load_file("headless-star.csv", false).then((out) => console.log(out)).then(() => view_file().then((out) => console.log(out)))
// // search_file("Sol", "").then((out) => console.log(out))

// export default {load_file, view_file, search_file}