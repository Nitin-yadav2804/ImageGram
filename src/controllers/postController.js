import { createPostService, deletePostService, getAllPostsService, updatePostService } from '../services/postService.js';

export async function createPost(req, res) {

    if (!req.file || !req.file.location) {
        return res.status(400).json({
            success: false,
            message: 'Image file is required'
        });
    }

    // call the service layer function
    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location,
    });

    return res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: post
    });
}
// /api/v1/posts?limit=10&offset=0
export async function getAllPosts(req, res) {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPage = await getAllPostsService(limit, offset);

        return res.status(200).json({
            success: true,
            message: 'All posts fetched successfully',
            data: paginatedPage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const response = await deletePostService(postId);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function updatePost(req, res){
     try {
        const updateObject = req.body;
        if(req.file){
            updateObject.image = req.file.location;
        }
        const response = await updatePostService(req.params.id, updateObject);

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
