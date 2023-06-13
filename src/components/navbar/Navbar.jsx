import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo'>VNT</span>
        <div className='navItems'>
          <button className='navButton'>Đăng ký</button>
          <button className='navButton'>Đăng nhập</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
