import {
    APP_AUTH_EXPIRES_IN,
    APP_AUTH_SECRET,
} from '../../shared/constants/global';

export default {
    secret: APP_AUTH_SECRET || '',
    expiresIn: APP_AUTH_EXPIRES_IN || '1d',
};
