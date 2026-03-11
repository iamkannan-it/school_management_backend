import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from '../schema/attendance.schema';
import { CreateAttendanceDto } from '../DTO/create-attendance.dto';
import { UpdateAttendanceDto } from '../DTO/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const newAttendance = new this.attendanceModel(createAttendanceDto);
    return await newAttendance.save();
  }

  async findAll(): Promise<Attendance[]> {
    return await this.attendanceModel
      .find({ isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('markedBy', 'firstName lastName staffId')
      .exec();
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel
      .findById(id)
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('markedBy', 'firstName lastName staffId')
      .exec();

    if (!attendance || attendance.isDeleted) {
      throw new NotFoundException('Attendance record not found');
    }

    return attendance;
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return await this.attendanceModel
      .find({ studentId, isDeleted: false })
      .populate('classId', 'className grade section')
      .populate('markedBy', 'firstName lastName staffId')
      .sort({ date: -1 })
      .exec();
  }

  async findByClass(classId: string): Promise<Attendance[]> {
    return await this.attendanceModel
      .find({ classId, isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('markedBy', 'firstName lastName staffId')
      .sort({ date: -1 })
      .exec();
  }

  async findByDate(date: string): Promise<Attendance[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return await this.attendanceModel
      .find({
        date: { $gte: startDate, $lte: endDate },
        isDeleted: false,
      })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('markedBy', 'firstName lastName staffId')
      .exec();
  }

  async update(
    id: string,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    const updatedAttendance = await this.attendanceModel
      .findByIdAndUpdate(id, updateAttendanceDto, { new: true })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('markedBy', 'firstName lastName staffId')
      .exec();

    if (!updatedAttendance || updatedAttendance.isDeleted) {
      throw new NotFoundException('Attendance record not found');
    }

    return updatedAttendance;
  }

  async remove(id: string): Promise<{ message: string }> {
    const attendance = await this.attendanceModel.findById(id);

    if (!attendance || attendance.isDeleted) {
      throw new NotFoundException('Attendance record not found');
    }

    attendance.isDeleted = true;
    await attendance.save();

    return { message: 'Attendance record deleted successfully' };
  }
}
