import { Role } from '../../database/entities/roles.entity';

export class ShowUserDTO {
    public id: string;
    public username: string;
    public roles: Role[];
}
