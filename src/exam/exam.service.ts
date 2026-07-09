import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam, ExamDocument } from './schemas/exam.schema';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name) private readonly examModel: Model<ExamDocument>,
  ) {}

  async create(data: any): Promise<ExamDocument> {
    const exam = new this.examModel(data);
    return exam.save();
  }

  async findAll(): Promise<ExamDocument[]> {
    return this.examModel.find().exec();
  }

  async findById(id: string): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id).exec();
    if (!exam) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
    return exam;
  }

  async update(id: string, data: any): Promise<ExamDocument> {
    const exam = await this.examModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!exam) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
    return exam;
  }

  async delete(id: string): Promise<void> {
    const result = await this.examModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
  }
}
