import React from 'react';
import {Container, Logo, LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const authStatus = useSelector((state) => state.auth?.status || false); //this variable will store status. lot of data values will display or not is dependent on value of status.
  const navigate = useNavigate()
  const navItems = [
    {//in production grade apps all nav items will be passed like this if extra added or reduced it would be easy to.
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,  //user logout hoga tabhi dikega.
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
      name: "Contact Us",
      slug: "/contact",
      active: authStatus,
  },
  ]
  return (
    <header className={`py-3 shadow ${authStatus ? 'bg-gray-500' : 'bg-gray-200'}`}>
      <Container>
        <nav className='flex'>  
           {/*whole nav bar under this nav tag  */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          {/* opent the ul */}
          <ul className='flex ml-auto'> 
            {navItems.map((item) =>   // mapped on nav items
            item.active ? (//if active display li of all items who are active
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)} //for routing onClick navigate to slug.
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
                >{item.name}</button>
              </li>
            ) : null//if not active
            )}
            {authStatus && ( //if authStatus is true that mean if already login then display logout btn.
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          {/* close the ul */}
        </nav>
        </Container>
    </header>
  );
};

export default Header;