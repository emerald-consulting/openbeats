import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public isAuthenticated: boolean;

  @Column()
  public isPremiumUser: boolean;

  @Column()
  public isStudent: boolean;

  @Column({ default: true })
  public isActive: boolean;

  @Column()
  public age: number;
}
