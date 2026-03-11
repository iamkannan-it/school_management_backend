import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade } from '../schema/grade.schema';
import { CreateGradeDto } from '../DTO/create-grade.dto';
import { UpdateGradeDto } from '../DTO/update-grade.dto';

@Injectable()
export class GradeService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<Grade>) {}

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const newGrade = new this.gradeModel(createGradeDto);
    return await newGrade.save();
  }

  async findAll(): Promise<Grade[]> {
    return await this.gradeModel
      .find({ isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('gradedBy', 'firstName lastName staffId')
      .exec();
  }

  async findOne(id: string): Promise<Grade> {
    const grade = await this.gradeModel
      .findById(id)
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('gradedBy', 'firstName lastName staffId')
      .exec();

    if (!grade || grade.isDeleted) {
      throw new NotFoundException('Grade record not found');
    }

    return grade;
  }

  async findByStudent(studentId: string): Promise<Grade[]> {
    return await this.gradeModel
      .find({ studentId, isDeleted: false })
      .populate('classId', 'className grade section')
      .populate('gradedBy', 'firstName lastName staffId')
      .sort({ examDate: -1 })
      .exec();
  }

  async findByClass(classId: string): Promise<Grade[]> {
    return await this.gradeModel
      .find({ classId, isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('gradedBy', 'firstName lastName staffId')
      .sort({ examDate: -1 })
      .exec();
  }

  async findBySubject(subject: string): Promise<Grade[]> {
    return await this.gradeModel
      .find({ subject, isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('gradedBy', 'firstName lastName staffId')
      .sort({ examDate: -1 })
      .exec();
  }

  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const updatedGrade = await this.gradeModel
      .findByIdAndUpdate(id, updateGradeDto, { new: true })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('gradedBy', 'firstName lastName staffId')
      .exec();

    if (!updatedGrade || updatedGrade.isDeleted) {
      throw new NotFoundException('Grade record not found');
    }

    return updatedGrade;
  }

  async remove(id: string): Promise<{ message: string }> {
    const grade = await this.gradeModel.findById(id);

    if (!grade || grade.isDeleted) {
      throw new NotFoundException('Grade record not found');
    }

    grade.isDeleted = true;
    await grade.save();

    return { message: 'Grade record deleted successfully' };
  }
}
