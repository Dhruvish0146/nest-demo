import { Injectable } from '@nestjs/common';
import { DevConfigService } from './Providers/devConfigService';

@Injectable()
export class AppService {

  constructor(private devConfigService : DevConfigService){}

  getHello(): string {
    return `Hello I am learning Nest.js  ${this.devConfigService.getDBHOST()} `;
  }
}
