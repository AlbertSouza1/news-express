export function buildPaginationInfo(req, hasNext) {
    const { page } = req.pagination;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    const hasPrevious = page > 1;

    const nextUrl = hasNext
        ? getFormattedUrl(baseUrl, page + 1)
        : null;

    const previousUrl = hasPrevious
        ? getFormattedUrl(baseUrl, page - 1)
        : null;

    return { hasNext, hasPrevious, nextUrl, previousUrl };
}

function getFormattedUrl(baseUrl, page) {
    const url = new URL(baseUrl);
    url.searchParams.set("page", page);
    return url.href;
}