import { countAllPosts, createPost, deletePostById, findAllPosts, updatePostById } from "../repositories/postrepository.js";

export const createPostService = async ( createPostObject ) => {

    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image; 
    // const user = createPostObject.user; 

    const post = await createPost(caption, image);

    return post;

}

export const getAllPostsService = async (limit, offset) => {
    const posts = await findAllPosts(limit, offset);

    // Calculate total number of Posts and total number of pages
    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts,
        totalPages,
        totalDocuments
    };
};

export const deletePostService = async (id) => {
    // Call the repository function
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    const response = await updatePostById(id, updateObject);
    return response;
}
