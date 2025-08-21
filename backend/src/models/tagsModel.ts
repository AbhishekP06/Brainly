import { Schema, model } from "mongoose";

const tagsSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const Tag = model('Tag', tagsSchema);

export default Tag;