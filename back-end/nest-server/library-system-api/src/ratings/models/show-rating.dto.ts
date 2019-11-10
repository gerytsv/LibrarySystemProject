import { Publish } from '../../transformer/decorators/publish';

import { ShowBookDTO } from '../../books/models/show-book.dto';

import { ShowUserDTO } from '../../users/models/show-user.dto';

export class ShowRatingDTO {
@Publish()
public id: string;
@Publish()
public vote: number;
@Publish(ShowBookDTO)
public book: ShowBookDTO;
@Publish(ShowUserDTO)
public user: ShowUserDTO;

}
