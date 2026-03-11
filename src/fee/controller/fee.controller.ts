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
import { FeeService } from '../services/fee.service';
import { CreateFeeDto } from '../DTO/create-fee.dto';
import { UpdateFeeDto } from '../DTO/update-fee.dto';
import { AddPaymentDto } from '../DTO/add-payment.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/auth/roles.enum';

@ApiTags('Fee')
@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.ACCOUNTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new fee record' })
  create(@Body() createFeeDto: CreateFeeDto) {
    return this.feeService.create(createFeeDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.ACCOUNTANT, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all fee records' })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query('studentId') studentId?: string,
    @Query('classId') classId?: string,
    @Query('status') status?: string,
  ) {
    if (studentId) {
      return this.feeService.findByStudent(studentId);
    }
    if (classId) {
      return this.feeService.findByClass(classId);
    }
    if (status) {
      return this.feeService.findByStatus(status);
    }
    return this.feeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.ACCOUNTANT, UserRole.CLERK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a fee record by ID' })
  findOne(@Param('id') id: string) {
    return this.feeService.findOne(id);
  }

  @Post(':id/payment')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.ACCOUNTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a payment to a fee record' })
  addPayment(@Param('id') id: string, @Body() addPaymentDto: AddPaymentDto) {
    return this.feeService.addPayment(id, addPaymentDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.ACCOUNTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a fee record' })
  update(@Param('id') id: string, @Body() updateFeeDto: UpdateFeeDto) {
    return this.feeService.update(id, updateFeeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a fee record' })
  remove(@Param('id') id: string) {
    return this.feeService.remove(id);
  }
}
