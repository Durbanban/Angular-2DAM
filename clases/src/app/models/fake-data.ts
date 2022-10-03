import {Student} from "./student.interface";
import { Gender } from "../gender.enum";

export const ALUMNOS_FAKE: Student[] = [
    {id: '1', name: 'Álvaro', surname: 'Franco', age: 25, gender: Gender.HOMBRE},
    {id: '2', name: 'David', surname: 'García', age: 20, gender: Gender.HOMBRE},
    {id: '3', name: 'Víctor', surname: 'Frontález', age: 20, gender: Gender.HOMBRE},
    {id: '4', name: 'Jose Luis', surname: 'Gil', age: 20, gender: Gender.MUJER},
    {id: '5', name: 'Valentín', surname: 'Tola', age: 20, gender: Gender.NO_BINARIO},
    {id: '6', name: 'Mario', surname: 'Ruiz', age: 28, gender: Gender.HOMBRE},
    {id: '7', name: 'Xopin', surname: 'Rivas', age: 26, gender: Gender.HOMBRE},
    {id: '8', name: 'Anapi', surname: 'Barba', age: 19, gender: Gender.MUJER},
    {id: '9', name: 'Jerónimo Manuel', surname: 'Pérez', age: 29, gender: Gender.HELICOPTERO_APACHE}
];