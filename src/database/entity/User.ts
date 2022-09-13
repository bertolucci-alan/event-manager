import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Event } from './Event';
import { Institute } from './Institute';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  balance: number;

  @Column()
  isAdmin: boolean;

  //user institutes relationship
  @OneToMany(() => Institute, (institutes) => institutes.owner)
  institutes: Institute[];

  //user events relationship
  @OneToMany(() => Event, (events) => events.owner)
  events: Event[];

  //users_events relationship
  @ManyToMany(() => Event, (users) => users.users)
  users_events: Event[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword?(): Promise<void> {
    this.password = await hash(this.password, 8);
  }
}
