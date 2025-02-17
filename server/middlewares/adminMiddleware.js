import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');  // Fetch the user without password

        // Check if user is an admin
        if (req.user && req.user.role === 'admin') {
            next();  // Allow the request to proceed if the user is an admin
        } else {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });  // Invalid or expired token
    }
};

export default adminMiddleware;
