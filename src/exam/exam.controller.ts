import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExamService } from './exam.service';
import { QuestionService } from './question.service';
import { ExamGenerationService } from './exam-generation.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('exams')
@ApiBearerAuth()
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
  @ApiOperation({
    summary: 'Create exam',
    description: 'Creates a new exam (professor only).',
  })
  async create(@Body() dto: CreateExamDto) {
    return this.examService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List exams',
    description: 'Returns all exams. Available to any authenticated user.',
  })
  async findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get exam by ID',
    description: 'Returns a single exam by its MongoDB ID.',
  })
  async findOne(@Param('id') id: string) {
    const exam = await this.examService.findById(id);
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  @Patch(':id')
  @Roles('professor')
  @ApiOperation({
    summary: 'Update exam',
    description: 'Updates an existing exam (professor only).',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.examService.update(id, dto);
  }

  @Delete(':id')
  @Roles('professor')
  @ApiOperation({
    summary: 'Delete exam',
    description: 'Deletes an exam by ID (professor only).',
  })
  async remove(@Param('id') id: string) {
    return this.examService.delete(id);
  }

  @Get(':examId/questions')
  @ApiOperation({
    summary: 'Get exam questions',
    description: 'Returns all questions for a given exam.',
  })
  async getQuestions(@Param('examId') examId: string) {
    return this.questionService.findByExam(examId);
  }

  @Post(':examId/questions')
  @Roles('professor')
  @ApiOperation({
    summary: 'Add question',
    description: 'Adds a question to an exam (professor only).',
  })
  async addQuestion(
    @Param('examId') examId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionService.create({ ...dto, examId });
  }

  @Post('generate/:materialId')
  @Roles('professor')
  @ApiOperation({
    summary: 'Generate exam from material',
    description: 'AI-generates an exam from RAG material (professor only).',
  })
  async generate(@Param('materialId') materialId: string) {
    return this.examGenerationService.generateExam(materialId);
  }
}
