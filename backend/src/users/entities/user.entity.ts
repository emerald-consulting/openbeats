import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
}
