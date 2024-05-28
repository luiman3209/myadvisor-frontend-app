// utils/jwtDecode.ts
import { jwtDecode} from 'jwt-decode';

export default (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};
