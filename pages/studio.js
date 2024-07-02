import { getSession } from 'next-auth/client';

const Studio = () => (
    <div>
        <h1>Sanity Studio</h1>
        {/* Ваша логика студии */}
    </div>
);

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
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

export default Studio;
