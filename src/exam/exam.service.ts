import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamService {
  // TODO
  async create(_data: any): Promise<any> {
    return { _id: 'mock-exam-id', ..._data };
  }

  // TODO
  async findAll(): Promise<any[]> {
    return [];
  }

  // TODO
  async findById(_id: string): Promise<any> {
    return null;
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
