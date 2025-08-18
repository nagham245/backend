exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

<<<<<<< HEAD
    const existingUser = await User.findOne({ email });
=======
\    const existingUser = await User.findOne({ email });
>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
=======
\    const hashedPassword = await bcrypt.hash(password, 10);

\    const newUser = new User({
>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
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
