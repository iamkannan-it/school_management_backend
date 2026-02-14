import { Body, Controller, Post, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto, UpdateStaffDto } from '../DTO/staff.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('staff')
@ApiTags('/staff')
export class StaffController {
    constructor(
        private readonly staffService: StaffService
    ){}

    @ApiBearerAuth('JWT')
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({ type: CreateStaffDto })
    async createStaff(@Body()req: CreateStaffDto){
        const response= await this.staffService.CreateStaff(req)
        return response;
    }

    @ApiBearerAuth('JWT')
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllStaff(){
        const response = await this.staffService.getAllStaff();
        return response;
    }

    @ApiBearerAuth('JWT')
    //@UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiParam({ name: 'id', description: 'Staff ID' })
    async getStaffById(@Param('id') id: string){
        const response = await this.staffService.getStaffById(id);
        return response;
    }

    @ApiBearerAuth('JWT')
    //@UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    @ApiParam({ name: 'id', description: 'Staff ID' })
    @ApiBody({ type: UpdateStaffDto })
    async updateStaff(@Param('id') id: string, @Body() req: UpdateStaffDto){
        const response = await this.staffService.updateStaff(id, req);
        return response;
    }
}
