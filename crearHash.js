const bcrypt = require('bcrypt');

bcrypt.hash('0123456789', 10)
.then(hash => {
    console.log(hash);
});