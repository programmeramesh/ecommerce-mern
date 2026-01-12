const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  console.log("Login attempt for email:", email);

  try {
    const checkUser = await User.findOne({ email });
    console.log("User found:", !!checkUser);
    
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    console.log("Password match:", checkPasswordMatch);
    
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    console.log("JWT token created successfully");

    // Simplify response - return token in body instead of cookie for cross-origin
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log("Login error details:", e);
    console.log("Error stack:", e.stack);
    res.status(500).json({
      success: false,
      message: "Some error occurred during login",
      error: process.env.NODE_ENV === 'development' ? e.message : undefined,
    });
  }
};

//logout

const logoutUser = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.clearCookie("token", cookieOptions).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  // Try to get token from cookie first, then from Authorization header
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
