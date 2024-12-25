import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;
const position_schema = new Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openPosition: {
      type: String, 
      required: true,
    },
    date:{
      type:Date,
    },
  },
  {
    timestamps: true,
  }
);
// to hash password
/*
user_schema.pre("save", async function (next){
  const user = this;
  const hash = await bycrpt.hash(this.password, 10);
  this.password = hash;
  next();
  }
);
*/
export const Position = mongoose.model("Position", position_schema);