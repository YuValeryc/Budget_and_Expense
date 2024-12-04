const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../modules/UserModel');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const user = new Users({
            name,
            email,
            password,
        });

        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;
    console.log(req.body);
    try {
        const user = await Users.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Sai mật khẩu' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
