import { Gender } from "../gender.enum";

export interface Student {
    id: string;
    name: string;
    surname: string;
    age: number;
    gender: Gender;
}