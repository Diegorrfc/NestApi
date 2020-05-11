import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Custumer } from '../models/custumer.model';
import { Pet } from '../models/pet.model';

@Injectable()
export class PetService {
  /**
   *
   */
  constructor(@InjectModel('Custumer') private readonly custumer: Model<Custumer>) {}  

  async createPet(document: string, data: Pet): Promise<Custumer>{
    const options ={upsert:true, new:true};
    return await this.custumer.findOneAndUpdate(
      {document},
      {$push:{pets:data}}, options)
  }
  async updatePet(document: string, data: Pet): Promise<Custumer>{
    const custumer =  await this.custumer.findOneAndUpdate(
      { document },
      { $set: { pets: data } },
      { upsert: true , new: true, projection: { _id: 0 } },
    )
    console.log(custumer)
    return custumer;
  }

 
}
