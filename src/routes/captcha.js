const e = require("express");
const { Router } = require("express");
const router = Router();
const svgCaptcha = require("svg-captcha");

router.get("/", (req, res) => {
  try {
    const url = req.query?.url;

    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      color: true,
      background: "#f0f0f0",
    });
    const captchaSVG = captcha.data;
    console.log(captcha.text);

    res.cookie("captchaText", captcha.text, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5, // 5 minutes
    });

    res.send(`
    <img src="data:image/svg+xml;base64,${Buffer.from(captchaSVG).toString(
      "base64"
    )}" alt="Captcha Image">
    <form action="/captcha?url=${url}" method="post">
      <label>Enter the answer: </label>
      <input type="text" name="userAnswer" required>
      <button type="submit">Submit</button>
    </form>
  `);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
    try {
        const url = req.query?.url;
        console.log(req.query);
        console.log(url);
        const captchaText = req.cookies?.captchaText;
        const userAnswer = req.body?.userAnswer;


        if (!captchaText || !userAnswer) {
            return res.redirect("/captcha");
        }

        if (captchaText === userAnswer) {
            res.clearCookie("captchaText");
            res.cookie("captcha", "true", {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 // 1 hour
            });
            if(url){
                return res.redirect(url);
            }
            else{
                return res.redirect("/");
            }
        }

        return res.send("Captcha failed!");

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;