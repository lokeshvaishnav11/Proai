const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios")

const TOKEN_EXPIRY = "3h"; // token valid for 3 hours — user has to login again after that

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { fullName, phone, password, confirmPassword } = req.body;

    if (!fullName || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone number and password are required",
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      phone,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      expiresIn: TOKEN_EXPIRY,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        plan: user.plan,
        trialEndsAt: user.trialEndsAt,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating account",
    });
  }
};

// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone number and password are required",
      });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      expiresIn: TOKEN_EXPIRY,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        plan: user.plan,
        trialEndsAt: user.trialEndsAt,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};

// @route GET /api/auth/me  (protected — needs valid token)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


exports.nextcrash = async (req, res) => {
  try {
    // const user = await User.findById(req.userId).select("-password");
    // if (!user) {
    //   return res.status(404).json({ success: false, message: "User not found" });
    // }
   const response = await axios.get('https://real-cash365.live/nextcrash2')
   const data = response.data
    return res.status(200).json(data );
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};