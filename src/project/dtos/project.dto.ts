import { IsString } from "class-validator";


export class ProjectCreateDTO {

    @IsString()
    name: string;
}