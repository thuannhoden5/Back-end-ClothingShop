const userRouter = require("express").Router()
const {isAuth}  = require("../../middlewares/authmiddlewares")
const { createNewUser, loginUser, updateProfile } = require("./user.service")

userRouter.post("/register", async (req, res) => {
    try {
        const { email, password, confirmPassword, role } = req.body

        if (password !== confirmPassword) {
            throw new Error("Password and confirm password unmatched")
        }

        let user = await createNewUser({ email, password, role })

        res.send({ success: 1, data: user })
    }
    catch (err) {
        res.send({ success: 0, message: err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password, role= "buyers" } = req.body
        
        const user = await loginUser({ email, password, role })

        res.send({ success: 1, data: user })
    }
    catch (err) {
        console.log(err)
        res.send({ success: 0, message: err.message })
    }
})

userRouter.get("/verify", isAuth, async (req, res) => {
    try {
        res.send({ success: 1, data: req.user })
    }
    catch (err) {
        res.send({ success: 0, message: err.message })
    }
})

userRouter.put("/updateProfile", isAuth, async (req, res) => {
    try {
        const userId = req.user._id;

        const updates = req.body

        const updatedUser = await updateProfile({ userId, updates })

        res.send({ success: 1, data: updatedUser })
    }
    catch (err) {
        console.log(err)

        res.send({ success: 0, message: err.message })
    }

})


module.exports = userRouter