import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassService } from '../services/class.service';
import { CreateClassDto } from '../DTO/create-class.dto';
import { UpdateClassDto } from '../DTO/update-class.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/auth/roles.enum';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new class' })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all active classes' })
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a class by ID' })
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a class' })
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a class' })
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
