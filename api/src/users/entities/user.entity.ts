import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicFile } from '../../files/entities/file.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;
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

  @Column({ nullable: true })
  @Expose()
  public genre?: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  public avatar?: PublicFile;
}
