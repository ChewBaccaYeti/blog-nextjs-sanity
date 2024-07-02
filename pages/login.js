import { signIn } from 'next-auth/client';

const Login = () => (
    <div>
        <h1>Login</h1>
        <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
                Email address
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button type="submit">Sign in</button>
        </form>
    </div>
);

export default Login;
