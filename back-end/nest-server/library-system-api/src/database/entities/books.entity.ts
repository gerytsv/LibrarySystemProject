import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('increment')
    public id: string;

    @Column({default: ''})
    public title: string;

    @Column({default: ''})
    public author: string;

    @Column({default: ''})
    public year: string;

    @Column({type: 'boolean', default: false})
    public freeToBorrow: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}
