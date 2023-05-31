import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { UserValues } from "@/types/user";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { stringAvatar } from "../../../utils/misc";
import useStyles from "./style";

// TODO: import better way all the material components

type HeaderProps = {
  user: UserValues;
  logout: () => void;
};

const pages = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Create Asset", href: "/create-asset" },
];

const Header = ({ user, logout }: HeaderProps) => {
  const router = useRouter();
  const { classes } = useStyles();
  const settings = [
    {
      name: "Profile",
      href: "/",
      onclick: () => router.push(`/profile/${user && user.id ? user.id : ""}`),
    },
    {
      name: "Logout",
      href: "/",
      onclick: () => {
        logout();
        router.push("/");
      },
    },
  ];
  const [isUserActive, setIsUserActive] = useState<Boolean>(false);

  useEffect(() => {
    setIsUserActive(user && user.email ? true : false);
  }, [user]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Image
              className={classes.logo}
              alt="LOGO"
              width={50}
              height={50}
              src="/surfboard.png"
            />
            <Typography
              variant="h6"
              component="span"
              className={classes.logoTitle}
            >
              NSURFT
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((link) => (
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{link.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  className={
                    router.pathname == link.href ? classes.activeLink : ""
                  }
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isUserActive && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.onclick}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
            <Box sx={{ display: "flex" }}>
              {!isUserActive ? (
                <>
                  <Link href="/login">
                    <Button
                      className={
                        router.pathname == "/login" ? classes.activeLink : ""
                      }
                      sx={{
                        my: 2,
                        color: "white",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      className={
                        router.pathname == "/signup" ? classes.activeLink : ""
                      }
                      sx={{
                        my: 2,
                        color: "white",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                  <Avatar
                    {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
