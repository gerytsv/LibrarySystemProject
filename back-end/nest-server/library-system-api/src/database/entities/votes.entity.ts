import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
import { User } from './users.entity';

import { Review } from './reviews.entity';

  @Entity('vote')
  export class Vote {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.votes)
    public user: Promise<User>;

    @ManyToOne(type => Review, review => review.votes)
    public review: Promise<Review>;

    @Column({ type: 'boolean', default: false })
    public liked: boolean;

    @Column({ type: 'boolean', default: false })
    public flagged: boolean;
  }
