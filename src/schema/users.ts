export interface UserType {
  id: number;
  name: string;
  avatar: string;
  username: string; 
  password: string;
  notification:number;
  messages:string[];
}

export interface UserStoreType {
  currentUser: UserType | null;
  isAuthenticated: boolean;
  requestPending: boolean;
  avatar: string;
}
export interface User {
  name: string;
  avatar: string;
  notification:number;
  messages:string[];
}
export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
}

export interface LoginActionType {
  type: string;
  payload: {
    user: UserType;
  };
}

export interface LogoutActionType {
  type: string;
}


export const mockedUsers: UserType[] = [
  {
    id: 1,
    name: "Shervin",
    avatar: "../assets/avatar1.png", 
    username: "shervin",  
    password: "shervin123", 
    notification: 1,
    messages: ["Message 1"]
  },
  {
    id: 2,
    name: "Bob",
    avatar: "../assets/avatar2.png",
    username: "Bobi@@", 
    password: "Bobi123",  
    notification: 2,
    messages: ["Message 1- this is a very long message notification this is a very long message notification", "Message 2"]
  },
  {
    id: 3,
    name: "Daniel",
    avatar: "../assets/avatar3.png",
    username: "daniel", 
    password: "daniel123" ,
    notification: 3,
    messages: ["Message 1", "Message 2", "Message 3"]
  },
];