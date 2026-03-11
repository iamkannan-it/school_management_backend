import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GradeService } from '../services/grade.service';
import { CreateGradeDto } from '../DTO/create-grade.dto';
import { UpdateGradeDto } from '../DTO/update-grade.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/auth/roles.enum';

@ApiTags('Grade')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new grade record' })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all grade records' })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'subject', required: false })
  findAll(
    @Query('studentId') studentId?: string,
    @Query('classId') classId?: string,
    @Query('subject') subject?: string,
  ) {
    if (studentId) {
      return this.gradeService.findByStudent(studentId);
    }
    if (classId) {
      return this.gradeService.findByClass(classId);
    }
    if (subject) {
      return this.gradeService.findBySubject(subject);
    }
    return this.gradeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a grade record by ID' })
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a grade record' })
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(id, updateGradeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a grade record' })
  remove(@Param('id') id: string) {
    return this.gradeService.remove(id);
  }
}
