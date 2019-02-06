const db = require('../_common/db');

const findAllByUser = async (userId) => {
    const query = {
        text: "SELECT * FROM blogs  WHERE user_id = $1",
        values: [userId]
    };
    return await db.selectMany(query);
}

const findById = async (id) => {
    const query = {
        text: "SELECT * FROM blogs  WHERE id = $1",
        values: [id]
    };
    return await db.selectOne(query);
}

const add = async ({ title, content, imagePath, userId }) => {
    const query = {
        text: `INSERT INTO  blogs(id, title, congtent, image_path, user_id) 
                VALUES(nextval('blog_seq'),$1, $2, $3, $4) 
                RETURNING *`,
        values: [title, content, imagePath, userId]
    };

    return await db.execute(query);
}


module.exports = {
    findAllByUser,
    findById,
    add
}



