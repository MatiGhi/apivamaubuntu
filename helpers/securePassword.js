const bcryptjs = require('bcryptjs');

const securePassword = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    return hashedPassword;
};

module.exports = {
    securePassword
};