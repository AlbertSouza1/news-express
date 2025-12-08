export const validateUserFields = (body) => {
    const { name, username, email, password, avatar, background } = body;

    if (!name || !username || !email || !password || !avatar || !background)
        return false;

    return true;
}