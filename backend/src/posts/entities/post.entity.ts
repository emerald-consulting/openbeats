import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public postId: number;

  @Column()
  public text?: string;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public genre?: string;
}
