import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Custumer } from '../models/custumer.model';
import { Address } from '../models/address.model';
;

@Injectable()
export class AddressService {
  /**
   *
   */
  constructor(
    @InjectModel('Custumer') private readonly custumer: Model<Custumer>) {}
  
   
  async createBillingAddress(document: string, data: Address): Promise<Custumer> {
    await this.custumer.findOneAndUpdate(
      { document },
      { $set: { billingAddress: data } },
      { upsert: true, rawResult: true },
    );
    
    return await this.custumer.find({document})
  }

   async createShippingAddress(document: string, data: Address): Promise<Custumer> {
    const custumer =  await this.custumer.findOneAndUpdate(
      { document },
      { $set: { shippingAddress: data } },
      { upsert: true , new: true, projection: { _id: 0 } , select:'shippingAddress name document'},
    );  
    console.log(custumer)
   return custumer;        
  } 
}
