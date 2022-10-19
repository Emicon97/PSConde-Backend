import { IsArray, ValidateNested } from 'class-validator';
import { CreateProductDto } from './products.dto';
import { Type } from 'class-transformer';

export class CreatePurchaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  public products: CreateProductDto[];
}
