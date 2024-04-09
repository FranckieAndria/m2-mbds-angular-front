import { Types } from 'mongoose';
export class Assignment {
  _id!:string;
  titre!: string;
  etudiant!: Types.ObjectId;
  professeur!: Types.ObjectId;
  dateDeCreation!:Date;
  dateDeRendu!:Date; 
  note!:number;
  remarque!:string;
  rendu!:boolean  
}