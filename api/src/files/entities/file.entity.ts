import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class PublicFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public fileId: string;

  @Column()
  public key: string;

  @OneToOne(() => Post, (post: Post) => post.fileUrl)
  public post?: Post;
}

export default PublicFile;
