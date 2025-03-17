// Base URL for API calls
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api-url.com'
  : 'https://book-store-backend-jade.vercel.app';

// Export both the constant and the function
export { baseURL };

// You can switch between development and production URLs based on environment
// export const baseURL = process.env.NODE_ENV === 'production' 
//   ? 'https://your-production-api-url.com'
//   : 'http://localhost:5000';

const getBaseUrl = () => {
    console.log('Using base URL:', baseURL);
    return baseURL;
}

export default getBaseUrl;