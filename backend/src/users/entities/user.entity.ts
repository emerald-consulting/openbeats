import { Exclude, Expose } from 'class-transformer';
import Post from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  @Expose()
  public firstName: string;

  @Column()
  @Expose()
  public lastName: string;

  @Column()
  @Expose()
  public username: string;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  @Expose()
  public isAuthenticated: boolean;

  @Column()
  @Expose()
  public isPremiumUser: boolean;

  @Column()
  @Expose()
  public isStudent: boolean;

  @Column({ default: true })
  @Expose()
  public isActive: boolean;

  @Column()
  @Expose()
  public age: number;

  @Column()
  @Expose()
  public bio: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}
