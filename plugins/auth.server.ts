import { getAuth } from 'firebase-admin/auth';
import app from '~/config/firebase-admin';
import formatUser from '~/helpers/format-user';

// Acts like nuxtServerInit.
// Checks if token is valid on first load.

export default defineNuxtPlugin(async () => {
	const token = useCookie('token');
	const user = useUser();

	const auth = getAuth(app);
	try {
		const result = await auth.verifyIdToken(token.value);
		user.value = formatUser(result);
	} catch (e) {
		// Not authenticated or invalid token
	}
});
