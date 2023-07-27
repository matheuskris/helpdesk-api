import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SigninDTO } from '../dtos/auth.dto';
import { ProjectService } from 'src/project/project.service';

interface SignUpParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {

    constructor (private readonly prismaService: PrismaService, private readonly projectService: ProjectService) {}

    async signUp(body: SignUpParams) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
            },
        });

        return this.generateToken({name: user.name, id: user.id})
    }

    async signin(body: SignInParams) {

        const user = await this.prismaService.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const passwordMatch = bcrypt.compare(body.password, user.password);

        if (!passwordMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.generateToken({name: user.name, id: user.id})
    }

    async me(userId: number) {
        const user = await this.prismaService.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
            },
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }
        
        const userProjects = await this.projectService.getUserProjects(userId);
       
        return {
            ...user,
            projects: userProjects,
        }
    }

    private generateToken({ name, id }: { name: string, id: number }) {
        return jwt.sign({
            name,
            id,
        }, process.env.JSON_TOKEN_KEY, {
            expiresIn: '7d',
        });
    }

}
