
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

export const URLPREFIX = "http://localhost:2000/"

export interface User{
  available_provider: string,
  bio: string,
  created_at: string,
  email: string,
  id: string,
  name: string,
  picture: string,
  rating_provider: number,
  rating_recipient: number,
  service: number
}

export interface EditableUser{
  bio: string,
  name: string,
  picture: string,
  service: number,
  available_provider: string
}

export interface Review{
  rating: number;
  content: string;
  poster: string;

}

export interface ServiceType{
  id: number,
  service: string

}


export interface Opportunity{
  id: number;
  job: number;
  name: string;
  poster: string;
  location: string;
  start_day: number;
  start_month: number;
  start_year: number;
  end_day: number;
  end_month: number;
  end_year: number;
  overview: string;
  
}
