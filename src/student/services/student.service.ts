import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student } from '../schema/student.schema';
import { CreateStudentDto } from '../DTO/create-student.dto';
import { UpdateStudentDto } from '../DTO/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const existingStudent = await this.studentModel.findOne({
      $or: [
        { studentId: createStudentDto.studentId },
        { email: createStudentDto.email },
        { username: createStudentDto.username },
      ],
      isDeleted: false,
    });

    if (existingStudent) {
      throw new ConflictException(
        'Student with this ID, email, or username already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
    const studentData = {
      ...createStudentDto,
      password: hashedPassword,
    };

    const newStudent = new this.studentModel(studentData);
    const savedStudent = await newStudent.save();

    const { password, ...studentObject } = savedStudent.toObject();
    return studentObject as any;
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel
      .find({ isActive: true, isDeleted: false })
      .select('-password')
      .populate('classId', 'className grade section classTeacherId')
      .populate('parents', 'firstName lastName email phone relationship')
      .exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel
      .findById(id)
      .select('-password')
      .populate('classId', 'className grade section classTeacherId')
      .populate('parents', 'firstName lastName email phone relationship')
      .exec();

    if (!student || student.isDeleted) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    if (updateStudentDto.password) {
      updateStudentDto.password = await bcrypt.hash(
        updateStudentDto.password,
        10,
      );
    }

    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .select('-password')
      .populate('classId', 'className grade section classTeacherId')
      .populate('parents', 'firstName lastName email phone relationship')
      .exec();

    if (!updatedStudent || updatedStudent.isDeleted) {
      throw new NotFoundException('Student not found');
    }

    return updatedStudent;
  }

  async remove(id: string): Promise<{ message: string }> {
    const student = await this.studentModel.findById(id);

    if (!student || student.isDeleted) {
      throw new NotFoundException('Student not found');
    }

    student.isDeleted = true;
    student.isActive = false;
    await student.save();

    return { message: 'Student deleted successfully' };
  }

  async findByStudentId(studentId: string): Promise<Student | null> {
    return await this.studentModel
      .findOne({ studentId, isDeleted: false })
      .exec();
  }

  async findByUsername(username: string): Promise<Student | null> {
    return await this.studentModel
      .findOne({ username, isDeleted: false })
      .exec();
  }
}
