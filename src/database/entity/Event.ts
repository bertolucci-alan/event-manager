import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '.';
import { Institute } from './Institute';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  rating: string;

  @Column()
  price: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  //institute relationship
  @OneToOne(() => Institute)
  @JoinColumn()
  institute: Institute;

  //owner relationship
  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  //users_events relationship
  @ManyToMany(() => User, (users) => users.users_events)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
