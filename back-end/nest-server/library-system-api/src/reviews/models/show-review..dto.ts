import { User } from '../../database/entities/users.entity';
import { Book } from '../../database/entities/books.entity';

export class ShowReviewDTO {
    public id: string;
    public content: string;
    public likes: number;
    public flags: number;
    public book: string;
    public user: string;
    public createdOn: Date;
}
