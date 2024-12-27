const crypto = require('crypto');

function hashPassword(password) {
    // Crear hash usando SHA-256
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
}

module.exports = hashPassword;