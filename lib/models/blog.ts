import {Schema, model, models} from "mongoose";

const BlogSchema = new Schema(
    {
      title: {type:"string", required: true, unique: true },
      description: {type:"string"},
      user: {type: Schema.Types.ObjectId, ref: "User"}, // relation with user
      category: {type: Schema.Types.ObjectId, ref: "Category"} // relation with category
    },
    {
        timestamps: true
    }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog; 

