import { User } from '../../database/entities/users.entity';
import { Book } from '../../database/entities/books.entity';
import { Publish } from '../../transformer/decorators/publish';
import { ShowUserDTO } from '../../users/models/show-user.dto';
import { ShowBookDTO } from '../../books/models/show-book.dto';

export class ShowReviewDTO {
    @Publish()
    public id: string;
    @Publish()
    public content: string;
    @Publish()
    public likes: number;
    @Publish()
    public flags: number;
    @Publish(ShowBookDTO)
    public book: string;
    @Publish(ShowUserDTO)
    public user: string;
    @Publish()
    public createdOn: Date;
}
