export function getCurrentUser() {
    const user = localStorage.getItem("user") || sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }