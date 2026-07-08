import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  // TODO
  async create(_data: any): Promise<any> {
    return { _id: 'mock-question-id', ..._data };
  }

  // TODO
  async findByExam(_examId: string): Promise<any[]> {
    return [];
  }

  // TODO
  async update(_id: string, _data: any): Promise<any> {
    return null;
  }

  // TODO
  async delete(_id: string): Promise<void> {
    // noop
  }
}
