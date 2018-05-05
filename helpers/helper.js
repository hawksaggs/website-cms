exports.sendJsonResponse = (res, status, content) => {
    res.status(status).send(content);
}