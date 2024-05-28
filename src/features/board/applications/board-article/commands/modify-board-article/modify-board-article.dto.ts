import { IsOptional, IsString, Max } from 'class-validator';

export class ModifyBoardArticleDto {
  @IsOptional()
  @IsString()
  @Max(200)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
