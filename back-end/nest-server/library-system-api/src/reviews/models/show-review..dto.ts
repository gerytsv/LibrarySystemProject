import { User } from '../../database/entities/users.entity';
import { Book } from '../../database/entities/books.entity';
import { Publish } from '../../transformer/decorators/publish';
import { ShowUserDTO } from '../../users/models/show-user.dto';
import { ShowBookDTO } from '../../books/models/show-book.dto';
import { CreateBookDTO } from '../../books/models/create-book.dto';

export class ShowReviewDTO {
    @Publish()
    public id: string;
    @Publish()
    public content: string;
    @Publish()
    public likes: number;
    @Publish()
    public flags: number;
    @Publish(CreateBookDTO)
    public book: ShowBookDTO;
    @Publish(ShowUserDTO)
    public user: ShowUserDTO;
    @Publish()
    public createdOn: Date;
}
