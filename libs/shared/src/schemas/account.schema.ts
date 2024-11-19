import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Account extends Document {
  @Prop({ required: true, unique: true })
  readonly username: string;

  @Prop({ unique: true })
  readonly email: string;

  @Prop({ required: true })
  readonly password: string;

  @Prop({ type: Boolean, name: 'email_verified', default: false })
  email_verified: boolean;

  @Prop({ name: 'profile_url', default: '' })
  photoProfile: string;

  @Prop({ name: 'google_id', default: '' })
  googleId: string;

  @Prop({ name: 'github_id', default: '' })
  githubId: string;

  @Prop({ name: 'verify_code' })
  verifyCode: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
