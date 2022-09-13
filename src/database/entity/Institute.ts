import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './Event';
import { User } from './User';

@Entity('institutes')
export class Institute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  CNPJ: string;

  //institute events relationship
  @OneToMany(() => Event, (events) => events.institute)
  events: Event[];

  //owner institutes relationship
  @ManyToOne(() => User, (User) => User.events)
  @JoinColumn({
    name: 'ownerId',
    referencedColumnName: 'id',
  })
  owner: User;

  @Column()
  ownerId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
