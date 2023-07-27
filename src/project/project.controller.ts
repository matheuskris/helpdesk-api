import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { ProjectCreateDTO } from './dtos/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @Post('/')
    createProject(
			@Body() body: ProjectCreateDTO, 
			@User() user: { id: number, name: string }) {
			if(!user) {
				throw new UnauthorizedException();
			}
			
			return this.projectService.createProject(body, user.id);
    }

    @Get('/:id')
    getProjectById(
			@Param('id') id: number,
			@User() user: { id: number, name: string }) {
			if(!user) {
				throw new UnauthorizedException();
			}
			
			return this.projectService.getProjectById(id, user.id);
    }

    @Get('/:id/calls')
    getCalls(
			@Param('id') id: string,
			@User() user: { id: number, name: string },
    ) {
			console.log(id);
			return '';
    }
}
