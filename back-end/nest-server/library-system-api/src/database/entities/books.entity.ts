import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @Column()
    public author: string;

    @Column()
    public year: string;

    @Column({type: 'boolean', default: false})
    public freeToBorrow: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}
