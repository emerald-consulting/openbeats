import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PublicFile } from './publicFile.entity';

@Entity()
class WAVFile extends PublicFile {
  /* Included in PublicFile
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
  */
}

export default WAVFile;
