import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public codigo: string;

  @IsString()
  public descrip: string;

  @IsString()
  public linea: string;

  @IsString()
  public marca: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  public venta1: number;

  @IsOptional()
  public venta2: number;

  @IsOptional()
  public venta3: number;

  @IsOptional()
  public venta4: number;

  @IsOptional()
  public venta5: number;

  @IsOptional()
  public venta6: number;

  @IsOptional()
  public venta7: number;

  @IsOptional()
  public venta8: number;

  @IsOptional()
  public venta9: number;

  @IsOptional()
  public venta10: number;

  @IsString()
  public rutaFoto: string;
}
