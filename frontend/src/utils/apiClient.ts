import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
if (!BASE_URL) {
	throw new Error("BACKEND_BASE_URL is not defined in the environment variables.");
}
console.log(BASE_URL);

// NOTE: didn't include Content-Type header as it may vary based on the request
//  (e.g. might need to send files, etc.)
export default axios.create({
	baseURL: BASE_URL,
	timeout: 10000, // 10 second timeout
	withCredentials: true,
});