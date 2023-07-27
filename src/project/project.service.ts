import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDTO } from './dtos/project.dto';

@Injectable()
export class ProjectService {

	constructor(private readonly prismaService: PrismaService) {}

	async createProject(body: ProjectCreateDTO, userId: number) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});

		if(!user) {
			throw new Error('User not found');
		}

		const project = await this.prismaService.project.create({
			data: {
				name: body.name,
				users: {
					create: {
						manager: true,
						user: {
							connect: {
								id: user.id,
							},
						},
					}
				}
			}
		});

		return project;
	}

	async getUserProjects(userId: number) {
		const userProjects = await this.prismaService.project.findMany({
			select: {
				name: true,
				id: true,
			},
			where: {
				users: {
					some: {
						userId,
					},
				}
			}
		});

		return userProjects;
	}

	async getProjectById(projectId: number, userId: number) {
		console.log(projectId, userId)
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});

		if(!user) {
			throw new Error('User not found');
		}

		const project = await this.prismaService.project.findUnique({
			select: {
				name: true,
				id: true,
				users: {
					select: {
						manager: true,
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				}
			},
			where: {
				id: projectId,
			},
		});

		if(!project) {
			throw new Error('Project not found');
		}

		const userInProject = project.users.find((user) => user.user.id === userId);

		if(!userInProject) {
			throw new UnauthorizedException();
		}

		return project;
	}
}

