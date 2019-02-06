const db = require('../_common/db');

const findById = async (id) => {
    const query = {
        text: "SELECT * FROM users  WHERE id = $1",
        values: [id]
    };
    return await db.selectOne(query);
}

const findByGoogleId = async (googleId) => {
    const query = {
        text: "SELECT * FROM users  WHERE google_id = $1",
        values: [googleId]
    };
    return await db.selectOne(query);
}

const add = async ({ googleId, displayName }) => {
    const query = {
        text: `INSERT INTO users(id, google_id, display_name) 
                VALUES(nextval('user_seq'),$1, $2) 
                RETURNING *`,
        values: [googleId, displayName]
    };

    return await db.execute(query);
}


module.exports = {
    findById,
    findByGoogleId,
    add
}



