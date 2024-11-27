import UserAccountData from "../Models/UserPannel.js";

async function handleUserRequest(req, res) {
  const { action, username, mobile, email, password } = req.body;

  try {
    if (action === "signup") {
      // Handle Signup
      const newUser = await UserAccountData.create({
        Username: username,
        MobileNumber: mobile,
        Email: email,
        Password: password,
      });
      return res.json({
        message: "User registered successfully",
        user: {
          Id: newUser._id,
          Username: newUser.Username,
          Email: newUser.Email,
          MobileNumber: newUser.MobileNumber,
        },
      });
    } else if (action === "login") {
      // Handle Login
      const user = await UserAccountData.findOne({
        $or: [
          { Username: username },
          { Email: email },
          { MobileNumber: mobile },
        ],
        Password: password,
      });

      if (user) {
        return res.json({
          message: "Login successful",
          user: {
            Id: user._id,
            Username: user.Username,
            Email: user.Email,
            MobileNumber: user.MobileNumber,
          },
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error processing request", error: err.message });
  }
}

async function GetUserDataFunction(req,res){
  try {
    const UserData = await UserAccountData.find();
    res.status(200).json(UserData);
  } catch (error) {
    console.error("Error fetching User data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { handleUserRequest , GetUserDataFunction};
