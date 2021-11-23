import { Injectable, Optional, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { PublicFile } from './entities/file.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { Connection } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  public async uploadPublicFile(buffer: Buffer, filename: string) {
    const s3 = new S3();
    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: buffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();

      const newFile = this.publicFilesRepository.create({
        key: uploadResult.Key,
        url: uploadResult.Location,
      });
      await this.publicFilesRepository.save(newFile);
      return newFile.url;
    } catch (error) {
      return error;
    }
  }

  public async downloadPublicFile(id: number) {
    const pubfile = await this.publicFilesRepository.findOne({ id: id });
    if (pubfile) {
      const s3 = new S3();
      const stream = await s3
        .getObject({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Key: pubfile.key,
        })
        .createReadStream();
      return stream;
    } else {
      throw new NotFoundException();
    }
  }

  public async getPublicFileById(id: number) {
    return await this.publicFilesRepository.findOne({ id: id });
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }

  async deletePublicFileWithQueryRunner(
    fileId: number,
    queryRunner: QueryRunner,
  ) {
    const file = await queryRunner.manager.findOne(PublicFile, { id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await queryRunner.manager.delete(PublicFile, fileId);
  }
}
