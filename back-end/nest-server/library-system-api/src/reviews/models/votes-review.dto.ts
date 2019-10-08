import { IsEnum } from 'class-validator';
import { UpdateReviewAction } from '../../common/constants';

export class UpdateReviewDTO {
    @IsEnum(UpdateReviewAction)
    public action: UpdateReviewAction;
}
