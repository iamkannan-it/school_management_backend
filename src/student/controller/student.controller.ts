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
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../DTO/create-student.dto';
import { UpdateStudentDto } from '../DTO/update-student.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/auth/roles.enum';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new student' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all active students' })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a student by ID' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a student' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a student' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
