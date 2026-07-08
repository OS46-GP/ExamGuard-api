import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExamService } from './exam.service';
import { QuestionService } from './question.service';
import { ExamGenerationService } from './exam-generation.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('exams')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly examGenerationService: ExamGenerationService,
  ) {}

  @Post()
  @Roles('professor')
  async create(@Body() body: any) {
    return this.examService.create(body);
  }

  @Get()
  async findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.examService.findById(id);
  }

  @Patch(':id')
  @Roles('professor')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.examService.update(id, body);
  }

  @Delete(':id')
  @Roles('professor')
  async remove(@Param('id') id: string) {
    return this.examService.delete(id);
  }

  @Get(':examId/questions')
  async getQuestions(@Param('examId') examId: string) {
    return this.questionService.findByExam(examId);
  }

  @Post(':examId/questions')
  @Roles('professor')
  async addQuestion(@Param('examId') examId: string, @Body() body: any) {
    return this.questionService.create({ ...body, examId });
  }

  @Post('generate/:materialId')
  @Roles('professor')
  async generate(@Param('materialId') materialId: string) {
    return this.examGenerationService.generateExam(materialId);
  }
}
