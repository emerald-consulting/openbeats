import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [UsersModule],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
