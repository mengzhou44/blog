const db = require('../_common/db');

const findAllByUser = (userId) => {
    const query = {
        text: "SELECT * FROM blogs  WHERE user_id = $1",
        values: [userId]
    };
    return db.selectMany(query);
}

const findById = (id) => {
    const query = {
        text: "SELECT * FROM blogs  WHERE id = $1",
        values: [id]
    };
    return db.selectOne(query);
}

const add = ({ title, content, imagePath, userId }) => {
    const query = {
        text: `INSERT INTO  blogs(title, congtent, image_path, user_id) 
                VALUES(nextval('blog_seq'),$1, $2, $3, $4) 
                RETURNING *`,
        values: [title, content, imagePath, userId]
    };

    return db.execute(query);
}


const remove = (id) => {
    const query = {
        text: `DELETE FROM blogs
               WHERE id = $1
               RETURNING *`,
        values: [id]
    };

    return db.execute(query);
}

module.exports = {
    findAllByUser,
    findById,
    add,
    remove,
}



