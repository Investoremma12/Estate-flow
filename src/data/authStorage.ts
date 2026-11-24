interface SignUpData {
	fullName: string;
	email: string;
	password: string;
}

export interface AuthUser {
	fullName: string;
	email: string;
}

interface StoredUser extends AuthUser {
	passwordSalt: string;
	passwordHash: string;
}

interface AuthSession {
	user: AuthUser;
	authenticatedAt: string;
}

const USERS_STORAGE_KEY = 'estateflow.users';
const SESSION_STORAGE_KEY = 'estateflow.session';
const PASSWORD_HASH_ITERATIONS = 100_000;

const toHex = (bytes: Uint8Array) =>
	Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

function fromHex(value: string): Uint8Array<ArrayBuffer> {
	if (!/^(?:[0-9a-f]{2})+$/i.test(value)) {
		throw new Error('Saved account data is invalid. Please clear the saved auth data and try again.');
	}

	const bytes = new Uint8Array(value.length / 2);
	for (let index = 0; index < bytes.length; index += 1) {
		bytes[index] = Number.parseInt(value.slice(index * 2, index * 2 + 2), 16);
	}
	return bytes;
}

async function hashPassword(password: string, salt: Uint8Array<ArrayBuffer>) {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		'PBKDF2',
		false,
		['deriveBits'],
	);
	const hash = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			hash: 'SHA-256',
			salt,
			iterations: PASSWORD_HASH_ITERATIONS,
		},
		key,
		256,
	);

	return toHex(new Uint8Array(hash));
}

function getStoredUsers(): StoredUser[] {
	const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
	if (!storedUsers) return [];

	const parsedUsers: unknown = JSON.parse(storedUsers);
	if (
		!Array.isArray(parsedUsers) ||
		!parsedUsers.every(
			(user) =>
				typeof user === 'object' &&
				user !== null &&
				typeof user.fullName === 'string' &&
				typeof user.email === 'string' &&
				typeof user.passwordSalt === 'string' &&
				typeof user.passwordHash === 'string',
		)
	) {
		throw new Error('Saved account data is invalid. Please clear the saved auth data and try again.');
	}

	return parsedUsers as StoredUser[];
}

function isAuthSession(value: unknown): value is AuthSession {
	if (
		typeof value !== 'object' ||
		value === null ||
		!('user' in value) ||
		!('authenticatedAt' in value)
	) {
		return false;
	}

	const user = value.user;
	return (
		typeof user === 'object' &&
		user !== null &&
		'fullName' in user &&
		typeof user.fullName === 'string' &&
		'email' in user &&
		typeof user.email === 'string' &&
		typeof value.authenticatedAt === 'string'
	);
}

function getStoredSession(storage: Storage): AuthSession | null {
	const storedSession = storage.getItem(SESSION_STORAGE_KEY);
	if (!storedSession) return null;

	let parsedSession: unknown;
	try {
		parsedSession = JSON.parse(storedSession);
	} catch (error) {
		if (!(error instanceof SyntaxError)) throw error;
		storage.removeItem(SESSION_STORAGE_KEY);
		return null;
	}

	if (!isAuthSession(parsedSession)) {
		storage.removeItem(SESSION_STORAGE_KEY);
		return null;
	}

	return parsedSession;
}

export function getCurrentAuthUser(): AuthUser | null {
	return (
		getStoredSession(localStorage)?.user ??
		getStoredSession(sessionStorage)?.user ??
		null
	);
}

export function updateAuthUserProfile(email: string, fullName: string): AuthUser {
	const normalizedEmail = email.trim().toLowerCase();
	const normalizedFullName = fullName.trim();
	if (!normalizedFullName) {
		throw new Error('Please enter your name.');
	}

	const users = getStoredUsers();
	const userIndex = users.findIndex((user) => user.email === normalizedEmail);
	if (userIndex === -1) {
		throw new Error('This account could not be found. Please sign in again.');
	}

	const updatedUser: AuthUser = {
		fullName: normalizedFullName,
		email: users[userIndex].email,
	};
	users[userIndex] = { ...users[userIndex], fullName: normalizedFullName };
	localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

	for (const storage of [localStorage, sessionStorage]) {
		const session = getStoredSession(storage);
		if (session?.user.email === normalizedEmail) {
			storage.setItem(
				SESSION_STORAGE_KEY,
				JSON.stringify({ ...session, user: updatedUser }),
			);
		}
	}

	return updatedUser;
}

export function signOutUser(): void {
	localStorage.removeItem(SESSION_STORAGE_KEY);
	sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export function deleteUserAccount(email: string): void {
	const normalizedEmail = email.trim().toLowerCase();
	const users = getStoredUsers();
	const remainingUsers = users.filter((user) => user.email !== normalizedEmail);

	if (remainingUsers.length === users.length) {
		throw new Error('This account could not be found. Please sign in again and retry.');
	}

	localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(remainingUsers));
	signOutUser();
}

export async function registerUser(data: SignUpData): Promise<AuthUser> {
	const email = data.email.trim().toLowerCase();
	const users = getStoredUsers();

	if (users.some((user) => user.email === email)) {
		throw new Error('An account with this email already exists. Please sign in instead.');
	}

	const salt: Uint8Array<ArrayBuffer> = crypto.getRandomValues(new Uint8Array(16));
	const newUser: StoredUser = {
		fullName: data.fullName.trim(),
		email,
		passwordSalt: toHex(salt),
		passwordHash: await hashPassword(data.password, salt),
	};

	localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...users, newUser]));

	return { fullName: newUser.fullName, email: newUser.email };
}

export async function signInUser(
	email: string,
	password: string,
	rememberMe: boolean,
): Promise<AuthUser> {
	const normalizedEmail = email.trim().toLowerCase();
	const user = getStoredUsers().find((storedUser) => storedUser.email === normalizedEmail);

	if (!user) {
		throw new Error('No account was found for this email. Please sign up first.');
	}

	const salt = fromHex(user.passwordSalt);
	const passwordHash = await hashPassword(password, salt);
	if (passwordHash !== user.passwordHash) {
		throw new Error('The password you entered is incorrect.');
	}

	const session: AuthSession = {
		user: { fullName: user.fullName, email: user.email },
		authenticatedAt: new Date().toISOString(),
	};

	sessionStorage.removeItem(SESSION_STORAGE_KEY);
	localStorage.removeItem(SESSION_STORAGE_KEY);
	(rememberMe ? localStorage : sessionStorage).setItem(
		SESSION_STORAGE_KEY,
		JSON.stringify(session),
	);

	return session.user;
}
