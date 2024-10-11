// const { Schema, models, model } = require("mongoose");
import { Schema, models, model } from 'mongoose'
const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    category: { type: String},
    description: { type: String},
    tags: { type: [String]},
    status: { type: String},
}, { timestamps: true });

export const Blog = models.Blog || model('Blog', BlogSchema, 'blogtest')