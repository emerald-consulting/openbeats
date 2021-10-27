import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '../../posts/entities/post.entity';
import Address from './address.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @Expose()
  public firstName: string;

  @Column()
  @Expose()
  public lastName: string;

  @Column({ unique: true })
  @Expose()
  public username: string;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: true })
  @Expose()
  public isAuthenticated?: boolean;

  @Column({ default: false, nullable: true })
  @Expose()
  public isPremiumUser?: boolean;

  @Column({ default: false, nullable: true })
  @Expose()
  public isStudent?: boolean;

  @Column({ default: true, nullable: true })
  @Expose()
  public isActive?: boolean;

  @Column({ nullable: true })
  @Expose()
  public age?: number;

  @Column({ nullable: true })
  @Expose()
  public bio?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address?: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];
}
