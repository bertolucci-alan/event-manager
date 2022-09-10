import {
  Authorized,
  Body,
  CurrentUser,
  JsonController,
  Post,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { CreateInstituteDTO } from '../dtos/CreateInstituteDTO';
import { CreateInstituteUseCase } from '../useCases/CreateInstituteUseCase';

@JsonController('/institutes')
export class InstituteController {
  @Authorized()
  @Post('/')
  async create(
    @Body() body: CreateInstituteDTO,
    @CurrentUser() authId: number
  ) {
    const createInstitute: CreateInstituteUseCase = container.resolve(
      CreateInstituteUseCase
    );
    return await createInstitute.execute(body, authId);
  }
}
