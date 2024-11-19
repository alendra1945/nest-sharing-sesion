import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Account } from './account.schema';

enum Gender {
  NONE = 0,
  MALE = 1,
  FEMALE = 2,
}
enum HOROSKOP {
  NONE = '',
  ARIES = 'aries',
  TAURUS = 'taurus',
  GEMINI = 'gemini',
  CANCER = 'cancer',
  LEO = 'leo',
  VIRGO = 'virgo',
  LIBRA = 'libra',
  SCORPIUS = 'scorpius',
  SAGITTARIUS = 'sagitarius',
  CAPRICORNUS = 'capricrnus',
  AQUARIUS = 'aquarius',
  PISCES = 'pisces',
}
enum CHINESE_ZODIAC {
  NONE = '',
  RABBIT = 'rabbit',
  TIGER = 'tiger',
  OX = 'ox',
  RAT = 'rat',
  PIG = 'pig',
  DOG = 'dog',
  ROOSTER = 'rooster',
  MONKEY = 'monkey',
  GOAT = 'goat',
  HORSE = 'horse',
  SNAKE = 'snake',
  DRAGON = 'dragon',
}

@Schema()
export class Profile extends Document {
  @Prop('display_name')
  displayName: string;

  @Prop({ type: Number, enum: Gender, default: Gender.NONE })
  gender: Gender;

  @Prop()
  birthday: Date;

  @Prop({ type: String, enum: HOROSKOP, default: HOROSKOP.NONE })
  horoskop: string;

  @Prop({ type: String, enum: CHINESE_ZODIAC, default: CHINESE_ZODIAC.NONE })
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ type: Types.ObjectId, ref: 'Account' })
  account: Account;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
