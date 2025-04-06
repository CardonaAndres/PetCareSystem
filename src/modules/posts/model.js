import { connDataBase } from '../../utils/database.js';

const conn = await connDataBase();

export const getAllPostsPaginated = async (offset) => {
    const [ posts ] = await conn.query(
        `SELECT * FROM posts LIMIT 9 OFFSET ?`,
        [offset]
    );

    return posts;
}

export const totalPosts = async () => {
    const [ total ] = await conn.query(
        `SELECT COUNT(*) as total FROM posts`,[]
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