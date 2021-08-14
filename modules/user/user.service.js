const userModel = require("./user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const getToken = (userId, role) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_USER_SECRET, { expiresIn: process.env.JWT_EXPIRES });

    return token
}

const createNewUser = async ({ email, password, role }) => {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await userModel.create({ email, password: hashPassword, role })

    const token = getToken(user._id, role)

    return { user, token }
}

const loginUser = async ({ email, password, role }) => {
    const foundUser = await userModel.findOne({ email: email, role }).lean()

    const {password: foundPassword, ...userData} = foundUser

    if (!foundUser) {
        throw new Error('User not in the system')
    }

    const samePassword = await bcrypt.compare(password, foundPassword)

    if (!samePassword) {
        throw new Error("Your password is wrong")
    }

    const token = getToken(foundUser._id, role)

    return { user: userData, token }
}

const updateProfile = async ({ userId, updates }) => {
    const foundUser = await userModel.findById(userId)

    if (!foundUser) throw new Error("Profile is not found")

    const fields = Object.keys(updates)

    fields.forEach((field) => {
        foundUser[field] = updates[field]
    })

    await foundUser.save()

    return foundUser
}

module.exports = {
    createNewUser,
    loginUser,
    updateProfile,
}