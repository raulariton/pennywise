// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
//

//
// export function useCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//
//   async function fetchAllCategories() {
//     try {
//       const token = Cookies.get('access-token'); // 👈 get token from cookie
//
//       const response = await axios.get('http://localhost:8000/categories', {
//         headers: {
//           Authorization: `${token}`,
//         },
//         withCredentials: true, // optionally needed for cookie-based auth
//       });
//
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to load categories');
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   useEffect(() => {
//     fetchAllCategories();
//   }, []);
//
//   return { categories, loading, error, fetchAllCategories };
// }
