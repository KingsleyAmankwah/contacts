import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

export const USER_URL = `${BASE_URL}/api/user`;
export const CONTACT_URL = `${BASE_URL}/api/contact`;
export const TRASH_URL = `${BASE_URL}/api/trash`;
export const LABEL_URL = `${BASE_URL}/api/label`;
