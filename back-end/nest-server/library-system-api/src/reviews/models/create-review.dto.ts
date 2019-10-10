import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateReviewDTO {
    @IsString()
    @IsNotEmpty()
    public content: string;
}
