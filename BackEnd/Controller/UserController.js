const { AuthModel } = require("../Model/AuthModel");
const bcrypt = require("bcryptjs");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await AuthModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get All Users Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE user (self-update)
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await AuthModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE user (self-delete)
const deleteUser = async (req, res) => {
  try {
    const user = await AuthModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
