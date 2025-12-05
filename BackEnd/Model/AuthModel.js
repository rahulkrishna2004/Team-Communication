const mongoose = require("mongoose");
const joi = require("joi");

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  createdAt: { type: Date, default: Date.now },
});

const AuthModel = mongoose.model("User", AuthSchema);

const validateUser = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("student").optional(),
  });
  return schema.validate(data);
};

module.exports = { AuthModel, validateUser };
