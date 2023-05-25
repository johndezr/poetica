import React from "react";
import { getStorageValue, setStorageValue } from "../../utils/storage";

const UserContext = React.createContext();

class UserStore extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const user = this.getCurrentLocalStorageUser();
    if (user) {
      this.setState({ user });
    }
  }

  getCurrentLocalStorageUser = () => {
    const users = getStorageValue("users");
    const userId = getStorageValue("userId");
    const user = users?.find((user) => user.id === userId);
    return user;
  };

  updateUser = (user) => {
    const users = getStorageValue("users");
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
    setStorageValue("users", users);
    this.setState({ user });
  };

  logout = () => {
    localStorage.removeItem("userId");
    this.setState({ user: null });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          logout: this.logout,
          updateUser: this.updateUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const withUserContext = (WrappedComponent) => {
  const UserComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(consumerProps) => <WrappedComponent {...consumerProps} {...props} />}
      </UserContext.Consumer>
    );
  };
  return UserComponent;
};

export { UserStore, withUserContext };
