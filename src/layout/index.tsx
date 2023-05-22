import React from 'react'
import Main from './main/index'
import Header from './header/index'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}

export default Layout
