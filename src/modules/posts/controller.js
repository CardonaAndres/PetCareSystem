import * as PostsModel from './model.js';

export const getAllPosts = async (req, res) => {
    try {
        const { page = 1 } = req.query; 
        const offset = (page - 1) * 9; 
        const totalPosts = await PostsModel.totalPosts(req.user.user_ID);
        const posts = await PostsModel.getAllPostsPaginated(req.user.user_ID, offset);
        const totalPages = Math.ceil(totalPosts / 9);

        return res.status(200).json({
            posts,
            pagination : {
                currentPage: page,
                totalPages,
                totalPosts,
            }
        })

    } catch (err){
       return res.status(500).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = {
            user_ID: req.user.user_ID,
            title,
            content
        }

        await PostsModel.createPost(post);
        return res.status(201).json({ message: 'Post creado correctamente' });

    } catch (err){
       return res.status(500).json({ message: err.message });
    }
}

export const editPost = async (req, res) => {
    try {
        const { post_ID } = req.params;
        const { title, content } = req.body;
        const post = {
            post_ID,
            user_ID: req.user.user_ID,
            title,
            content
        }

        await PostsModel.editPost(post);
        return res.status(200).json({ message: 'Post editado correctamente' });

    } catch (err){
       return res.status(500).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { post_ID } = req.params;
        await PostsModel.deletePost(post_ID);
        return res.status(200).json({ message: 'Post eliminado correctamente' });

    } catch (err){
       return res.status(500).json({ message: err.message });
    }
}