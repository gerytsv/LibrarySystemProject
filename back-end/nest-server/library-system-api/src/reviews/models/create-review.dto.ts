import { IsString, IsInt } from 'class-validator';

export class CreateReviewDTO {
    @IsString()
    public content: string;
}
