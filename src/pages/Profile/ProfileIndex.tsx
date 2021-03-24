import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { storage, firebaseAuth } from "../../services/Firebase/firebase";
import { Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IsLoading from "../../components/IsLoading/IsLoading";
import { OLD_WHITE, OLD_WHITE_DARK } from "../../assets/constants/Constants";
import { dispatchLogout, setAlertDialog } from "../../store/admin/adminCreator";
import TextField from "@material-ui/core/TextField";
import { getCurrentUser } from "../../services/Firebase/authentication";

export interface ProfileIndexProps { }

const ProfileIndex: React.FC<ProfileIndexProps> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootReducerProp) => state.admin.isLoading
  );
  const [imageUrl, setImageUrl] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [firstNewPassword, setFirstNewPassword] = useState("");
  const [secondNewPassword, setSecondNewPassword] = useState("");
  const currentUser = getCurrentUser()
  const username = useSelector(
    (state: RootReducerProp) => state.admin.authUser?.displayName
  );
  const email = useSelector(
    (state: RootReducerProp) => state.admin.authUser?.email
  );


  const handleChangePassword = () => {
    if (!firstNewPassword || !secondNewPassword) {
      dispatch(setAlertDialog("Please Fill out the passwords", true, true));
      return;
    }
    if (firstNewPassword !== secondNewPassword) {
      dispatch(setAlertDialog("Passwords are not equal", true, true));
      return;
    }
    if (firstNewPassword.length < 6) {
      dispatch(
        setAlertDialog("Passwords must be at least 6 characters", true, true)
      );
      return;
    }
    if (currentUser) {
      if (email) {
        var credential = firebaseAuth.EmailAuthProvider.credential(
          email, // references the user's email address
          currentPassword
        );
        currentUser
          .reauthenticateWithCredential(credential)
          .then(function () {
            // User re-authenticated.
            if (currentUser) {
              currentUser
                .updatePassword(firstNewPassword)
                .then(function () {
                  dispatch(setAlertDialog("Password was changed", false, true));
                  setCurrentPassword("")
                  setFirstNewPassword("")
                  setSecondNewPassword("")
                  setIsChangingPassword(false)
                })
                .catch(function (error) {
                  console.log(
                    "An error occurred while changing the password:",
                    error
                  );
                });
            }
          })
          .catch(function (error) {
            console.log("Some kinda bug: ", error);
            // An error happened.
          });
      }
    }
  };
  useEffect(() => {
    storage
      .ref("Images/Background/dnd_login.jpg")
      .getDownloadURL()
      .then((url: string) => setImageUrl(url));
  }, []);

  if (isLoading) {
    return (
      <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>

        <IsLoading />
      </Container>
    );
  }

  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>

      <ContentContainer>
        <h1>My Profile</h1>
        <div style={{ flex: 8, width: "90%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProfileRowString>Username: </ProfileRowString>
            <p>{username}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProfileRowString>Email: </ProfileRowString>
            <p>{email}</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            {isChangingPassword ? "Close window" : "Change password"}
          </Button>
          <ChangePasswordContainer
            style={
              isChangingPassword
                ? {
                  height: "20rem",
                  overflow: "hidden",
                }
                : { height: "0rem" }
            }
          >
            {isChangingPassword ? (
              <div
                style={
                  isChangingPassword
                    ? {
                      opacity: 1,
                      padding: "1rem",
                      display: "initial",
                      transition: "200ms",
                    }
                    : {
                      opacity: 0,
                      padding: "0",
                      display: "none",
                      transition: "200ms",
                    }
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    id="current password"
                    type="password"
                    label="Current password"
                    placeholder="Write your current password"
                    margin="normal"
                    style={{ width: "90%" }}
                    onChange={(event) =>
                      setCurrentPassword(event.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    id="second password"
                    type="password"
                    label="New password"
                    placeholder="Write your new password"
                    margin="normal"
                    style={{ width: "90%" }}
                    onChange={(event) =>
                      setFirstNewPassword(event.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    id="second password"
                    type="password"
                    label="New password"
                    placeholder="Write your new password"
                    margin="normal"
                    style={{ width: "90%" }}
                    onChange={(event) =>
                      setSecondNewPassword(event.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    margin: "1rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChangePassword()}
                  >
                    Change password
                    </Button>
                </div>
              </div>
            ) : null}
          </ChangePasswordContainer>
        </div>
        <div
          style={{
            flex: 1,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            onClick={() => dispatch(dispatchLogout())}
            variant="contained"
            color="secondary"
            style={{ width: "90%" }}
          >
            {" "}
              Log out
            </Button>
        </div>
      </ContentContainer>
    </Container>
  );
};

const ProfileRowString = styled.h2`
`;
const ChangePasswordContainer = styled.div`
  height: 0rem;
  margin: 1rem;
  transition: 200ms;
  background-color: ${OLD_WHITE_DARK};
  padding: 0rem;
`;
const ContentContainer = styled.div`
  min-height: 30rem;
  min-width: 15rem;
  width: 50%;
  flex-direction: column;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${OLD_WHITE};
`;
const Container = styled.div`
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
  min-height: 100vh;
`;
export default ProfileIndex;
