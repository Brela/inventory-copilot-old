import './loginWindow.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { createUser, loginUser } from '../../services/userAPIcalls';
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/auth.context";
import Swal from "sweetalert2";

export default function () {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);
  //   const [companyAddedPrompt, setCompanyAddedPrompt] = useState('');
  const [userAddedPrompt, setUserAddedPrompt] = useState("");
  const [userLoginErrorPrompt, setUserLoginErrorPrompt] = useState("");
  const [userAddedErrorPrompt, setUserAddedErrorPrompt] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (login) {
      const userData = await loginUser(
        data.get("username"),
        data.get("password")
      );
      if (userData.user) {
        console.log("logged in");
        logIn();
        return navigate("/");
      } else {
        setUserLoginErrorPrompt(userData.message);
        setLoading(false);
        return setPrompt(true);
      }
    } else {
      const userData = await createUser(
        data.get("username"),
        data.get("password")
      );
      if (userData.username) {
        // Automatically log the user in after successful registration
        const loginData = await loginUser(
          data.get("username"),
          data.get("password")
        );
        if (loginData.user) {
          console.log("signed up and logged in");
          logIn();
          return navigate("/");
        } else {
          setUserLoginErrorPrompt(loginData.message);
        }
      } else {
        console.log(userData);
        setUserAddedErrorPrompt(userData.message);
      }
      setLoading(false);
      return setPrompt(true);
    }
  };

  /*   const guests = {
    Guest1: "Guest175070",
    Guest2: "Guest275070",
    Guest3: "Guest375070",
    Guest4: "Guest475070",
    Guest5: "Guest575070",
    Guest6: "Guest675070",
  };

  const getRandomGuest = () => {
    const guestKeys = Object.keys(guests);
    const randomKey = guestKeys[Math.floor(Math.random() * guestKeys.length)];
    return {
      username: randomKey,
      password: guests[randomKey],
    };
  }; 

  const guestSubmit = async () => {
    const randomGuest = getRandomGuest();
    const userData = await loginUser(
      randomGuest.username,
      randomGuest.password
    );

    if (userData.user) {
      return navigate("/");
    } else {
      setUserLoginErrorPrompt(userData.message);
      setLoading(false);
      return setPrompt(true);
    }
  };
*/
  const goBack = async () => {
    setLoading(true);
    setUserAddedPrompt("");
    setUserAddedErrorPrompt(false);
    setUserLoginErrorPrompt(false);
    setPrompt(false);
    setLoading(false);
    setLogin(true);
  };

  return (
    <div className="loginWindow-container">
      <div className="title-container">
        <h1 className="title">Orderly</h1>
        <h3 className="sub-title">Inventory Tracking and Automation</h3>
      </div>
      <Box className="input-container" component="form" onSubmit={handleSubmit}>
        {prompt ? (
          <>
            {userAddedPrompt && (
              <div className="prompt">
                <p style={{ textAlign: "center" }}>
                  Thank you {userAddedPrompt} for signing up! Please sign in.
                </p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
            {userLoginErrorPrompt && (
              <div className="prompt">
                <p>{userLoginErrorPrompt}</p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
            {userAddedErrorPrompt && (
              <div className="prompt">
                <p>{userAddedErrorPrompt}</p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <CircularProgress
                className="circle-spinner"
                size="5rem"
                style={{ color: "#3b9893" }}
              />
            ) : (
              <>
                <p className="input-header">{login ? "Login" : "Sign Up"}</p>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  InputLabelProps={{
                    style: { color: "#3b9893" },
                  }}
                  sx={{ input: { cursor: "pointer" } }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={login && "password"}
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{
                    style: { color: "#3b9893" },
                  }}
                  sx={{ input: { cursor: "pointer" } }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: login ? 0 : 2 }}
                  id="submit-button"
                  className="login-button"
                >
                  {login ? "Sign In" : "Submit"}
                </Button>
                {/*    {login && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 4 }}
                    id="guest-submit-button"
                    className="login-button"
                    onClick={() => guestSubmit()}
                  >
                    Guest Sign In
                  </Button>
                )} */}
                <div className="new-account-container">
                  <p
                    className="new-account-link"
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    {login
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
}
