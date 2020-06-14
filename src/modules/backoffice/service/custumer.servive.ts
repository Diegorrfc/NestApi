import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Custumer } from '../models/custumer.model';
import { User } from '../models/user.model';
import { QueryDTo } from '../dtos/query/QueryDto';

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
  async checkExist(id: string): Promise<boolean>{
   var result: boolean;
    try {
      result = await this.custumer.exists({ _id:id }); 
    } catch (error) {
      result = false;
    }
    return result 
  }

  async query(model: QueryDTo): Promise<Custumer[]>{
    return await this.custumer.find(model.query, model.field, {skip: model.skip, limit: model.take}).sort(model.sort).exec();
  }
}
