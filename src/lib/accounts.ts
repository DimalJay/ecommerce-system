export interface RegisteredAccount {
  email: string;
  name: string;
}

const STORAGE_KEY = 'registered_accounts';

export const loadAccounts = (): RegisteredAccount[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveAccount = (account: RegisteredAccount): RegisteredAccount[] => {
  const accounts = loadAccounts();
  accounts.push(account);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  return accounts;
};
