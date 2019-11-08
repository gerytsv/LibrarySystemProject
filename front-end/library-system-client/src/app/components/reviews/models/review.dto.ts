import { User } from '../../../common/users/user';

export class ReviewDTO {

    public id: string;

    public content: string;

    public user: User;

    public createdOn: Date;
  }
