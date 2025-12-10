export const validateAllFields = (body) => {
    const { name, username, email, password, avatar, background } = body;

    if (!name || !username || !email || !password || !avatar || !background)
        return false;

    return true;
}

export const validateAtLeastOneFieldPassed = (body) => {
    const { name, username, email, password, avatar, background } = body;

    if (!name && !username && !email && !password && !avatar && !background)
        return false;

    return true;
}