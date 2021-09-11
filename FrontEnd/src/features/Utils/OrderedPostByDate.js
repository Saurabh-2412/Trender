export const orderPostByDate = (posts) => {
    return posts?.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};