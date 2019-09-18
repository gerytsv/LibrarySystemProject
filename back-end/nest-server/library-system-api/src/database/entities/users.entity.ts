import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './roles.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    public id: string;

    @Column({type : 'nvarchar', length: 30, unique: true})
    public username: string;

    @Column({type: 'nvarchar'})
    public password: string;

    @ManyToMany(type => Role, { eager: true })
    @JoinTable()
    public roles: Role[];

}
