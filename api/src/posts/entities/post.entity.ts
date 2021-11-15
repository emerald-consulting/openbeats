import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from '../../categories/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public fileid?: number;

  @Column({ nullable: true })
  public category?: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}
