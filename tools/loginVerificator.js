export const nameValidator = name => {
    if (!name || name.length <= 0) return true;
    return false;
};

export const passwordValidator = password => {
    if (!password || password.length <= 0) return true;
    return false;
};

