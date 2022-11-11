import React from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth);

  return (
    <div className='w-full flex flex-col justify-center items-center bg-white h-[75px] mb-20'>

<p className='fixed left-[700px] top-[30px]'>{user.user.firstName}</p>

<img src={user.user.avatar} alt="avatar" className='fixed h-[50px] right-5'/>

    </div>
  )
}

export default Header