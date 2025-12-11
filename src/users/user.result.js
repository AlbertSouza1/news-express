export class UserResult {
    constructor(id, name, username, email, avatar, background) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.background = background;
    }

    static fromUserModel(user) {
        return new UserResult(
            user._id,
            user.name,
            user.username,
            user.email,
            user.avatar,
            user.background
        );
    }
}