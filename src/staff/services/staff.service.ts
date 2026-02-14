import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Staff, StaffDocument } from '../schema/staff.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CreateStaffDto, UpdateStaffDto } from '../DTO/staff.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {

    constructor(
        @InjectModel(Staff.name)
        private readonly staffModel: Model<StaffDocument>,
    ) { }

    async CreateStaff(req: CreateStaffDto) {
        if (!req.password) {
            throw new Error('Password is required');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.password, saltRounds);

        const staffData = {
            ...req,
            passwordHash: hashedPassword,
            password: undefined
        };

        const newStaff = new this.staffModel(staffData);
        return newStaff.save();
    }

    async getAllStaff() {
        return this.staffModel.find({ isDeleted: false }).exec();
    }

    async getStaffById(id: string) {
        const staff = await this.staffModel.findOne({ _id: id, isDeleted: false }).exec();
        if (!staff) {
            throw new NotFoundException(`Staff with ID ${id} not found`);
        }
        return staff;
    }

    async updateStaff(id: string, req: UpdateStaffDto) {
        const updatedStaff = await this.staffModel
            .findOneAndUpdate(
                { _id: id, isDeleted: false },
                { $set: req },
                { new: true }
            )
            .exec();

        if (!updatedStaff) {
            throw new NotFoundException(`Staff with ID ${id} not found`);
        }
        return updatedStaff;
    }
}
