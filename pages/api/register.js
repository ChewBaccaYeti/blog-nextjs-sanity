import { sanityClient } from '../../lib/sanity';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const newUser = {
            _type: 'user',
            email,
            password, // В реальном приложении нужно хешировать пароль
            isAdmin: false, // Добавлюм поле isAdmin
        };
        await sanityClient.create(newUser);
        res.status(201).json({ message: 'User created' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
