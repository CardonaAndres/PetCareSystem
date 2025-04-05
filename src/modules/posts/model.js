import { connDataBase } from '../../utils/database.js';

const conn = await connDataBase();

export const getAllPostsPaginated = async (user_ID, offset) => {
    const [ posts ] = await conn.query(
        `SELECT * FROM posts WHERE user_ID = ? LIMIT 9 OFFSET ?`,
        [user_ID, offset]
    );

    return posts;
}

export const totalPosts = async (user_ID) => {
    const [ total ] = await conn.query(
        `SELECT COUNT(*) as total FROM posts WHERE user_ID = ?`,
        [user_ID]
    );

    return total[0].total;
}

export const createPost = async (post) => {
    const { user_ID, title, content } = post;
    await conn.query(
        `INSERT INTO posts (title, content, user_ID) VALUES (?, ?, ?)`,
        [title, content, user_ID]
    );
}

export const editPost = async (post) => {
    const { post_ID, title, content } = post;
    await conn.query(
        `UPDATE posts SET title = ?, content = ? WHERE post_ID = ?`,
        [title, content, post_ID]
    );
}

export const deletePost = async (post_ID) => {
    await conn.query(
        `DELETE FROM posts WHERE post_ID = ?`,
        [post_ID]
    );
}