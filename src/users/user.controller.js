export function getUser(req, res) {
    res.json({ user: 'none yet' });
}

export function createUser(req, res) {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name, !username, !email, !password, !avatar, !background) {
        res.json({ message: 'Submit all fields for registration.' });
    }

    const body = req.body;
    res.json({ user: body });
}

export function updateUser(req, res) {
    const body = req.body;
    res.json({ user: body });
}