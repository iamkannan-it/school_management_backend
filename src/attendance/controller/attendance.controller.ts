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
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../DTO/create-attendance.dto';
import { UpdateAttendanceDto } from '../DTO/update-attendance.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/auth/roles.enum';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new attendance record' })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all attendance records' })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'date', required: false })
  findAll(
    @Query('studentId') studentId?: string,
    @Query('classId') classId?: string,
    @Query('date') date?: string,
  ) {
    if (studentId) {
      return this.attendanceService.findByStudent(studentId);
    }
    if (classId) {
      return this.attendanceService.findByClass(classId);
    }
    if (date) {
      return this.attendanceService.findByDate(date);
    }
    return this.attendanceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an attendance record by ID' })
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an attendance record' })
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete an attendance record' })
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}
