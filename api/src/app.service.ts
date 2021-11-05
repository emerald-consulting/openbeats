import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;

  construct() {
    this.logger = new Logger();
  }

  getHello(): string {
    this.logger.debug('test');
    return 'Hello World!';
  }
}
