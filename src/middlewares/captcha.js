module.exports = function (req, res, next) {
    try {
        const captcha = req.cookies?.captcha;
        if (!captcha) {
            return res.redirect("/captcha?url=" + req.originalUrl);
        }
        next();
    } catch (error) {
        console.log(error);
    }
}