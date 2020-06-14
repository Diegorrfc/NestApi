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
    const options = {upsert: false, new: true };
    console.log(document)
    return await this.custumer.findOneAndUpdate(
      {_id: document},
      {$push:{pets:data}}, options)      
  }

  async updatePet(document: string, data: Pet): Promise<Custumer>{
    const custumer =  await this.custumer.findOneAndUpdate(
      { _id: document },
      { $set: { pets: data } },
      { upsert: true , new: true, projection: { _id: 0 } },
    )   
    return custumer;
  }
  async checkExist(document: string, data: Pet): Promise<Custumer>{
    var checkExist = await this.custumer.exists({ "pets.name": data.name });    
    return checkExist; 
  }
  async getAll(idCustumer: string): Promise<Custumer>{
    return await this.custumer.find({_id: idCustumer}).exec()

  }
  async delete(idCustumer: string, idPet: string){
    return await this.custumer.updateOne( {_id: idCustumer}, { $pull:  { pets: {_id: idPet } }});
  }
}
