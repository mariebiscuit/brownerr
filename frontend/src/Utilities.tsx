
export interface User{
  
  firstName: string;
  lastName: string;
  isOrganization: boolean;
  profilePicPath: string;
  categories: string[];
  subcategories: string[];
  bio: string;
  rate: number;
  rating: number;
  availability: string;
  overviews: string;
  mediaPath: string;
  reviews: Review[];
  isOrganizer: boolean;
  
}

export interface Review{
  rating: number;
  content: string;
  title: string;
  user: User;
  type: string;

}


export interface Opportunity{
  name: string;
  type: string;
  category: string;
  subcategory: string;
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