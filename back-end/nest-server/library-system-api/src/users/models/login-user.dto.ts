import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
// import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDTO {
  //   @ApiModelProperty()
  @IsString()
  public username: string;

  //   @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
