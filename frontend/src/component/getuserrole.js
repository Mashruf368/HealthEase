export const getUserRole = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:3001/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.role;
  } catch (err) {
    return null;
  }
};
