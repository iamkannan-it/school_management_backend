import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../schema/class.schema';
import { CreateClassDto } from '../DTO/create-class.dto';
import { UpdateClassDto } from '../DTO/update-class.dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const existingClass = await this.classModel.findOne({
      classId: createClassDto.classId,
      isDeleted: false,
    });

    if (existingClass) {
      throw new ConflictException('Class with this ID already exists');
    }

    const newClass = new this.classModel(createClassDto);
    return await newClass.save();
  }

  async findAll(): Promise<Class[]> {
    return await this.classModel
      .find({ isActive: true, isDeleted: false })
      .populate('classTeacherId', 'firstName lastName staffId email role')
      .populate('subjectTeachers', 'firstName lastName staffId email role')
      .exec();
  }

  async findOne(id: string): Promise<Class> {
    const classData = await this.classModel
      .findById(id)
      .populate('classTeacherId', 'firstName lastName staffId email role')
      .populate('subjectTeachers', 'firstName lastName staffId email role')
      .exec();

    if (!classData || classData.isDeleted) {
      throw new NotFoundException('Class not found');
    }

    return classData;
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const updatedClass = await this.classModel
      .findByIdAndUpdate(id, updateClassDto, { new: true })
      .populate('classTeacherId', 'firstName lastName staffId email role')
      .populate('subjectTeachers', 'firstName lastName staffId email role')
      .exec();

    if (!updatedClass || updatedClass.isDeleted) {
      throw new NotFoundException('Class not found');
    }

    return updatedClass;
  }

  async remove(id: string): Promise<{ message: string }> {
    const classData = await this.classModel.findById(id);

    if (!classData || classData.isDeleted) {
      throw new NotFoundException('Class not found');
    }

    classData.isDeleted = true;
    classData.isActive = false;
    await classData.save();

    return { message: 'Class deleted successfully' };
  }
}
