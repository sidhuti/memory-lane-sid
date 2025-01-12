export const PLACE_HOLDER_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

export const BASE_URL = 'http://localhost:4001';

export const DATE_FORMAT = 'MMM Do YYYY';

export const USER_EMAIL = 'jonDoe@test.com';

export enum SORT {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface Memory {
    id: number,
    name: string,
    description: string,
    timestamp: string,
    image: string
  }

  export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    description: string
  }
  