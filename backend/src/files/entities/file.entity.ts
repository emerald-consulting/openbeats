import { Injectable } from '@nestjs/common';
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
  public url: string;

  @Column()
  public key: string;

  @OneToOne(() => Post, (post: Post) => post.pubfile)
  public post?: Post;
}

export default PublicFile;
