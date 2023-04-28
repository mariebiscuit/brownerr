
export interface User{
  name: string;
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
  opportunities: Opportunity[];
}

export interface Review{
  rating: number;
  content: string;
  title: string;
  profilePicPath: string;

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
}

export interface MyDate{
  year: number;
  month: number;
  date: number;
}