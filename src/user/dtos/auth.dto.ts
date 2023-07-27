import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class SignupDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class SigninDTO {
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}