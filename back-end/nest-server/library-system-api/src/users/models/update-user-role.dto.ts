import { UserRole } from '../enums/user-roles.enum';
import { IsNotEmpty, IsArray } from 'class-validator';

export class UpdateUserRoleDTO {
    @IsArray()
    @IsNotEmpty()
    public roles: string[];
}
