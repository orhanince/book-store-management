import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  constructor() {}
  async hashPassword(pass): Promise<any> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);
  }

  async comparePassword(pass, hashedPas): Promise<any> {
    return await bcrypt.compare(pass, hashedPas);
  }
}
