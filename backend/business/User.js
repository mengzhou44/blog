const db = require('../_common/db');

const findById = (id) => {
    const query = {
        text: "SELECT * FROM users  WHERE id = $1",
        values: [id]
    };
    return db.selectOne(query);
}

const findByGoogleId = (googleId) => {
    const query = {
        text: "SELECT * FROM users  WHERE google_id = $1",
        values: [googleId]
    };
    return db.selectOne(query);
}

const add = ({ googleId, displayName }) => {
    const query = {
        text: `INSERT INTO users(google_id, display_name) 
                VALUES(nextval('user_seq'),$1, $2) 
                RETURNING *`,
        values: [googleId, displayName]
    };

    return db.execute(query);
}


module.exports = {
    findById,
    findByGoogleId
}



