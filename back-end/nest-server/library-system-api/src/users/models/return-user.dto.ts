import { Publish } from '../../transformer/decorators/publish';

export class ReturnUserDTO {
    @Publish()
    public id: string;
    @Publish()
    public username: string;
    @Publish()
    public roles: string[];

}

