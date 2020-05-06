import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Custumer } from '../models/custumer.model';
import { Address } from '../models/address.model';

@Injectable()
export class CustumerService {
  /**
   *
   */
  constructor(
    @InjectModel('Custumer') private readonly custumer: Model<Custumer>,
  ) {}

  async create(data: Custumer): Promise<Custumer> {
    const custumer = this.custumer(data);
    return await custumer.save();
  }

  async addBillingAddress(document: string, data: Address): Promise<Custumer> {
    return await this.custumer.findOneAndUpdate(
      { document },
      { $set: { billingAddress: data } },
      { upsert: true },
    );
  }
}
