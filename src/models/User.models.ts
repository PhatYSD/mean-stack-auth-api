import { Schema, model, Document } from "mongoose";
import * as bcrypt from "bcrypt";

interface UserDocument extends Document {
    username: string;
    password: string;
    date: Date;
}

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 16
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre<UserDocument>("save", async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);

    this.password = hashPassword;
    next();
});

const User = model<UserDocument>("User", userSchema);

export default User;