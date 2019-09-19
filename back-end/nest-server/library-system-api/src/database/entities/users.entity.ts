import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './roles.entity';
import { Review } from './reviews.entity';

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

    @OneToMany(type => Review, review => review.user)
    public reviews: Review[];

}
