import { Role } from '../../database/entities/roles.entity';
import { Publish } from '../../transformer/decorators/publish';

export class ShowUserDTO {
    @Publish()
    public id: string;
    @Publish()
    public username: string;
}
