import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Parent } from '../schema/parent.schema';
import { CreateParentDto } from '../DTO/create-parent.dto';
import { UpdateParentDto } from '../DTO/update-parent.dto';

@Injectable()
export class ParentService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<Parent>) {}

  async create(createParentDto: CreateParentDto): Promise<Parent> {
    const existingParent = await this.parentModel.findOne({
      $or: [
        { parentId: createParentDto.parentId },
        { email: createParentDto.email },
        { username: createParentDto.username },
      ],
      isDeleted: false,
    });

    if (existingParent) {
      throw new ConflictException(
        'Parent with this ID, email, or username already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(createParentDto.password, 10);
    const parentData = {
      ...createParentDto,
      password: hashedPassword,
    };

    const newParent = new this.parentModel(parentData);
    const savedParent = await newParent.save();

    const { password, ...parentObject } = savedParent.toObject();
    return parentObject as any;
  }

  async findAll(): Promise<Parent[]> {
    return await this.parentModel
      .find({ isActive: true, isDeleted: false })
      .select('-password')
      .populate('students', 'firstName lastName studentId email classId')
      .exec();
  }

  async findOne(id: string): Promise<Parent> {
    const parent = await this.parentModel
      .findById(id)
      .select('-password')
      .populate('students', 'firstName lastName studentId email classId')
      .exec();

    if (!parent || parent.isDeleted) {
      throw new NotFoundException('Parent not found');
    }

    return parent;
  }

  async update(id: string, updateParentDto: UpdateParentDto): Promise<Parent> {
    if (updateParentDto.password) {
      updateParentDto.password = await bcrypt.hash(
        updateParentDto.password,
        10,
      );
    }

    const updatedParent = await this.parentModel
      .findByIdAndUpdate(id, updateParentDto, { new: true })
      .select('-password')
      .populate('students', 'firstName lastName studentId email classId')
      .exec();

    if (!updatedParent || updatedParent.isDeleted) {
      throw new NotFoundException('Parent not found');
    }

    return updatedParent;
  }

  async remove(id: string): Promise<{ message: string }> {
    const parent = await this.parentModel.findById(id);

    if (!parent || parent.isDeleted) {
      throw new NotFoundException('Parent not found');
    }

    parent.isDeleted = true;
    parent.isActive = false;
    await parent.save();

    return { message: 'Parent deleted successfully' };
  }

  async findByParentId(parentId: string): Promise<Parent | null> {
    return await this.parentModel.findOne({ parentId, isDeleted: false }).exec();
  }

  async findByUsername(username: string): Promise<Parent | null> {
    return await this.parentModel
      .findOne({ username, isDeleted: false })
      .exec();
  }
}
