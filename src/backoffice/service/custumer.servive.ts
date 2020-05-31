import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Custumer } from '../models/custumer.model';
import { User } from '../models/user.model';

@Injectable()
export class CustumerService {
  /**
   *
   */
  constructor(
    @InjectModel('Custumer') private readonly custumer: Model<Custumer>) {}

  async create(data: Custumer): Promise<Custumer> {
    const custumer = await this.custumer(data).save();
    console.log(custumer);
    return custumer;
  }

  async getAll() : Promise<Custumer>{
    return await this.custumer.find({}).exec()
  }

  async get(document: string) : Promise<Custumer>{
    return await this.custumer.find({_id: document}).exec()
  }

  async update(user: User) : Promise<Custumer>{    
     return await this.custumer.findOneAndUpdate(
      { document },
      { $set: { name: user.username } },
      { upsert: true }).exec()
  } 
}
