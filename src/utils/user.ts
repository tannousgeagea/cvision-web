export function getCurrentUser() {
    const user = localStorage.getItem("current_user");
    return user ? JSON.parse(user) : null;
  }