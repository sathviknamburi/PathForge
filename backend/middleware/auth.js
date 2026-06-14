import jwt from 'jsonwebtoken';

/**
 * 🛡️ JWT Authentication Middleware
 * 
 * HOW IT WORKS:
 * 1. Client sends a request with header: Authorization: Bearer <token>
 * 2. This middleware extracts the token, verifies it using our secret key
 * 3. If valid, it attaches the user's ID to req.user and calls next()
 * 4. If invalid or missing, it returns a 401 Unauthorized response
 * 
 * USE: Add this middleware to any route that requires login
 * Example: router.get('/profile', auth, getProfile)
 */
const auth = (req, res, next) => {
  try {
    // Step 1: Get the Authorization header
    const authHeader = req.header('Authorization');

    // Step 2: Check if it exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please login first.' });
    }

    // Step 3: Extract the token (remove "Bearer " prefix)
    const token = authHeader.replace('Bearer ', '');

    // Step 4: Verify the token using our secret key
    // jwt.verify() will throw an error if the token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 5: Attach user info to the request object
    // Now any controller can access req.user.id
    req.user = { id: decoded.id };

    // Step 6: Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please login again.' });
  }
};

export default auth;
