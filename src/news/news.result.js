export class NewsResult {
    constructor(id, title, text, banner, createdAt, user, likes, comments) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.banner = banner;
        this.createdAt = createdAt;
        this.user = user;
        this.likes = likes;
        this.comments = comments;
    }

    static fromNewsModel(news) {
        return new NewsResult(
        news._id,
        news.title,
        news.text,
        news.banner,
        news.createdAt,
        news.user,
        news.likes,
        news.comments,
        );
    }
}