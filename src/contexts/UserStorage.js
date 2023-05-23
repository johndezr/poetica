import React from "react";

const UserContext = React.createContext();

class UserStore extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem("users"));
    const userId = JSON.parse(localStorage.getItem("userId"));
    const user = users?.find((user) => user.id === userId);
    if (user) {
      this.setState({ user });
    }
  }

  updateUser = (user) => {
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
