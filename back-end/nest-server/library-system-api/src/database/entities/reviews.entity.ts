import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Book } from './books.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('nvarchar', { default: '' } )
    public content: string;

    @Column('int', { default: 0 })
    public likes: number;

    @Column('int', { default: 0 })
    public flags: number;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp'})
    public createdOn: Date;

    @ManyToOne(type => User, user => user.reviews)
    public user: Promise<User>;

    @ManyToOne(type => Book, book => book.reviews)
    public book: Promise<Book>;
}
