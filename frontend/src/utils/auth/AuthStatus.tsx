import { useAuthContext } from "./AuthContext";

function AuthStatus() {
  const { isAuthenticated, getCurrentUser, signout } = useAuthContext();

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {getCurrentUser.user.name}!{" "}
      <button
        onClick={() => {
          signout();
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default AuthStatus;
