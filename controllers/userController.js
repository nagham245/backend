exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

\    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

\    const hashedPassword = await bcrypt.hash(password, 10);

\    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
