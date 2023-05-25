const ProfileTabView = ({ user, isWalletConnected }) => {
  return (
    <>
      {isWalletConnected ? (
        <p>Wallet Address: {user.wallet.address}</p>
      ) : (
        <p>Connect your wallet</p>
      )}
    </>
  );
};

export default ProfileTabView;
