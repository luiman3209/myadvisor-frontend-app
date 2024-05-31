// utils/jwtDecode.ts
import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  id: string;
  email: string;
  role: 'advisor' | 'investor';
  exp: number;
  iat: number;
  // Add other properties as needed
}

export default (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};
