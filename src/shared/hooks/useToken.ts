import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  email: string;
  role?: string;
  exp?: number;
  [key: string]: any;
};

export const decodedToken = (): DecodedToken | null => {
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (!token) {
    console.warn("Access token not found in cookies");
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Failed to decode access token", err);
    return null;
  }
};
