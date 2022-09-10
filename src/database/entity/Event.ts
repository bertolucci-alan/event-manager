import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '.';
import { Institute } from './Institute';

enum Rating {
  FREE = 'Free for all audiences',
  OVER10 = 'Not recommended for children under 10 years old',
  OVER14 = 'Not recommended for children under 14',
  OVER18 = 'Not recommended for under 18s',
}

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: Rating.FREE, type: 'enum', enum: Rating })
  rating: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToOne(() => Institute)
  @JoinColumn()
  institute: Institute;

  @ManyToOne(() => User, (User) => User.events)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column()
  user_id: number;

  @ManyToMany(() => User, (users) => users.users_events)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
