import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Exam, ExamDocument } from './schemas/exam.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Exam.name) private readonly examModel: Model<ExamDocument>,
  ) {}

  async create(data: any): Promise<QuestionDocument> {
    const question = new this.questionModel(data);
    await question.save();
    await this.examModel.findByIdAndUpdate(data.examId, {
      $push: { questionIds: question._id },
    });
    return question;
  }

  async findByExam(examId: string): Promise<QuestionDocument[]> {
    return this.questionModel.find({ examId }).exec();
  }

  async update(id: string, data: any): Promise<QuestionDocument> {
    const question = await this.questionModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    return question;
  }

  async delete(id: string): Promise<void> {
    const question = await this.questionModel.findByIdAndDelete(id).exec();
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    await this.examModel.findByIdAndUpdate(question.examId, {
      $pull: { questionIds: question._id },
    });
  }
}
