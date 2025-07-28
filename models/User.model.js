import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
      select: false,
    },
    avatar: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    // Check if the password is being modified
    if (this.isModified("password")) {
        // Hash the password before saving
        // Hash the password with a salt rounds of 10
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
    })

userSchema.methods = {
    comparePassword: async function (password) {
  return await bcrypt.compare(password, this.password);
}
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema,'users');
export default UserModel;