import * as userService from './user.service.js';

export function getUser(req, res) {
    res.json({ user: 'none yet' });
}

export async function createUser(req, res) {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({ message: 'Submit all fields for registration.' });
    }

    const body = req.body;

    const user = await userService.create(body);

    if (!user) {
        return res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
        message: "User created successfully",
        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    });
}

export function updateUser(req, res) {
    const body = req.body;
    res.json({ user: body });
}