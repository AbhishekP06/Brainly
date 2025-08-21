import { Schema, Types, model } from "mongoose";

const linkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: 'User', required: true, unique: true}
})

const Link = model('Link', linkSchema);

export default Link;
