import mongoose from "mongoose";

const moduleNoteSchema = new mongoose.Schema(
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
    note:{type:[mongoose.Schema.Types.Mixed],default:[{ type: "paragraph", content: "Add your notes..." }]}
  },
  { timestamps: true }
);


const moduleNote = mongoose.model("moduleNote", moduleNoteSchema);

export default moduleNote;