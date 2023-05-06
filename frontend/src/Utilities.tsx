
// export interface User{
//   id: number;
//   firstName: string;
//   lastName: string; //backend only has name
//   isOrganization: boolean;
//   profilePicPath: string;
//   categories: string[];
//   subcategories: string[]; //only support one 
//   bio: string;
//   rate: number; //get rid of it
//   rating: number;
//   availability: string;
//   overviews: string;
//   mediaPath: string;
//   reviews: Review[];
//   isOrganizer: boolean;
// }

export interface User{
  available_provider: number,
  bio: string,
  created_at: string,
  email: string,
  id: number,
  name: string,
  picture: string,
  rating_provider: number,
  rating_recipient: number,
  service: number
}


export interface Review{
  rating: number;
  content: string;
  title: string;
  user: User;
  type: string;
  receipient: User;

}


export interface Opportunity{
  id: number;
  name: string;
  type: string; //maybe not
  category: string;
  subcategory: string; //just this
  content: string;
  poster: User;
  location: string;
  startDate: MyDate;
  endDate: MyDate;
  overview: string;
  qualification: string[];
  responsibility: string[];  
  applicants: User[];

}

export interface MyDate{
  
  year: number;
  month: number;
  date: number;
}