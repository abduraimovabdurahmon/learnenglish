const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.log(error);
    }
    }
);

module.exports = router;