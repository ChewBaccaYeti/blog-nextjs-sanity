import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

import { sanityClient } from '../../lib/sanity';

const Users = ({ session }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await sanityClient.fetch('*[_type == "user"]');
            setUsers(result);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        await sanityClient.delete(userId);
        setUsers(users.filter(user => user._id !== userId));
    };

    if (!session) return <p>Access Denied</p>;

    return (
        <div>
            <h1>Manage Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email}
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || !session.user.isAdmin) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default Users;
