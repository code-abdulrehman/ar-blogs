export function user() {
  const getUser = localStorage.getItem("user");
  return getUser ? JSON.parse(getUser) : null; // Return null if no user data found
}
