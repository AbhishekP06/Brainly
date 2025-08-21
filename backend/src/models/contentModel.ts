import { Schema, Types, model } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'User', required: true}

})

const Content = model('Content', contentSchema);

export default Content;