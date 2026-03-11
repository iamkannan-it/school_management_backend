import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fee } from '../schema/fee.schema';
import { CreateFeeDto } from '../DTO/create-fee.dto';
import { UpdateFeeDto } from '../DTO/update-fee.dto';
import { AddPaymentDto } from '../DTO/add-payment.dto';

@Injectable()
export class FeeService {
  constructor(@InjectModel(Fee.name) private feeModel: Model<Fee>) {}

  async create(createFeeDto: CreateFeeDto): Promise<Fee> {
    const existingFee = await this.feeModel.findOne({
      feeId: createFeeDto.feeId,
      isDeleted: false,
    });

    if (existingFee) {
      throw new ConflictException('Fee with this ID already exists');
    }

    const newFee = new this.feeModel(createFeeDto);
    return await newFee.save();
  }

  async findAll(): Promise<Fee[]> {
    return await this.feeModel
      .find({ isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .exec();
  }

  async findOne(id: string): Promise<Fee> {
    const fee = await this.feeModel
      .findById(id)
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .exec();

    if (!fee || fee.isDeleted) {
      throw new NotFoundException('Fee record not found');
    }

    return fee;
  }

  async findByStudent(studentId: string): Promise<Fee[]> {
    return await this.feeModel
      .find({ studentId, isDeleted: false })
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .sort({ dueDate: -1 })
      .exec();
  }

  async findByClass(classId: string): Promise<Fee[]> {
    return await this.feeModel
      .find({ classId, isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .sort({ dueDate: -1 })
      .exec();
  }

  async findByStatus(status: string): Promise<Fee[]> {
    return await this.feeModel
      .find({ status, isDeleted: false })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .sort({ dueDate: 1 })
      .exec();
  }

  async addPayment(id: string, addPaymentDto: AddPaymentDto): Promise<Fee> {
    const fee = await this.feeModel.findById(id);

    if (!fee || fee.isDeleted) {
      throw new NotFoundException('Fee record not found');
    }

    if (fee.paidAmount + addPaymentDto.amount > fee.totalAmount) {
      throw new BadRequestException(
        'Payment amount exceeds remaining balance',
      );
    }

    fee.payments.push(addPaymentDto as any);
    fee.paidAmount += addPaymentDto.amount;

    await fee.save();

    const updatedFee = await this.feeModel
      .findById(id)
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .exec();

    if (!updatedFee) {
      throw new NotFoundException('Fee record not found');
    }

    return updatedFee;
  }

  async update(id: string, updateFeeDto: UpdateFeeDto): Promise<Fee> {
    const updatedFee = await this.feeModel
      .findByIdAndUpdate(id, updateFeeDto, { new: true })
      .populate('studentId', 'firstName lastName studentId email rollNumber')
      .populate('classId', 'className grade section')
      .populate('payments.collectedBy', 'firstName lastName staffId')
      .exec();

    if (!updatedFee || updatedFee.isDeleted) {
      throw new NotFoundException('Fee record not found');
    }

    return updatedFee;
  }

  async remove(id: string): Promise<{ message: string }> {
    const fee = await this.feeModel.findById(id);

    if (!fee || fee.isDeleted) {
      throw new NotFoundException('Fee record not found');
    }

    fee.isDeleted = true;
    await fee.save();

    return { message: 'Fee record deleted successfully' };
  }
}
