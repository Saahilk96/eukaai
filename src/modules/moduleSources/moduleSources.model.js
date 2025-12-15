import mongoose from "mongoose";

const moduleSourcesSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullGuideId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    moduleId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title:{
      type:String,
      required: true
    },
    text:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const moduleSources = mongoose.model("moduleSource", moduleSourcesSchema);

export default moduleSources;