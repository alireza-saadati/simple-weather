export const isLogin = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }
  return true;
};
