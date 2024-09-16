const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // ดึง Authorization header จาก request
    const authHeader = req.headers['authorization'];
    // แยก token ออกจาก header
    const token = authHeader && authHeader.split(' ')[1];

    // ถ้าไม่มี token ส่งสถานะ 401 (Unauthorized)
    if (!token) return res.sendStatus(401);

    // ตรวจสอบ token ด้วย jwt.verify
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            // ส่งสถานะ 403 (Forbidden) ถ้า token หมดอายุหรือไม่ถูกต้อง
            return res.status(403).json({ message: 'Access token expired or invalid' });
        }

        // ถ้า token ถูกต้อง ให้นำข้อมูล user ไปใช้ใน middleware อื่น
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
