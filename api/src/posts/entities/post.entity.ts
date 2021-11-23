import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from '../../categories/category.entity';
import { User } from '../../users/entities/user.entity';
import { PublicFile } from '../../files/entities/file.entity';

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
  public fileUrl?: string;

  // @OneToOne(() => PublicFile, (pubfile: PublicFile) => pubfile.post)
  // @JoinTable()
  // public pubfile?: PublicFile;

  @Column({ nullable: true })
  public category?: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}
