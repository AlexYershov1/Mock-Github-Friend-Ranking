import mongoose from "mongoose"

export const UsersDB = mongoose.model(
  "user",
  mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      creation_date: {
        type: Date,
        required: true,
      },
      img: {
        type: String,
        trim: true,
        required: true,
      },
      profile_link: {
        type: String,
        trim: true,
        required: true,
      },
      followers: [{
          type: mongoose.Types.ObjectId,
          ref: "user",
      }],
    },
    { timestamps: true }
  )
);
