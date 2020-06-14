import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  /**
   *
   */
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }

  async checkExist(user: User): Promise<boolean> {   
    var checkExist = await this.model.exists({ username:user.username });   
    return checkExist; 
  }

  async delete(username: string): Promise<boolean> {   
    var resultDelete = await this.model.deleteOne({ username:username });  
    return resultDelete; 
  }
}
