import React from 'react';

const Navbar = () => {
  const navs = [
    {
      id: '#overview',
      name: 'Overview',
    },
    {
      id: '#related-products',
      name: 'Related Products',
    },
    {
      id: '#questions-answers',
      name: 'Q & A',
    },
    {
      id: '#ratings-reviews',
      name: 'Reviews',
    },
  ];

  return (
    <div className='nav'>
      <a className='nav-logo' href='/'>
        SithQL
      </a>
      <div className='nav-items'>
        {
          navs.map((nav) => <a key={nav.id} href={nav.id}>{nav.name}</a>)
        }
      </div>
    </div>
  );
};

export default Navbar;
