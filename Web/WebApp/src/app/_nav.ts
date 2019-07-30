export const navItems = [
  {
    name: 'Profile',
    url: '/profile',
    icon: 'icon-user '
  },
  {
    name: 'Store',
    url: '/stores',
    icon: 'icon-grid '
  },
  {
    name: 'Statistic',
    url: '/statistic',
    icon: 'icon-chart',
    children: [
      {
        name: 'Store',
        url: '/statistic/store',
        icon: 'icon-home'
      },
      {
        name: 'Area',
        url: '/statistic/area',
        icon: 'icon-film'
      },
      {
        name: 'Camera',
        url: '/statistic/camera',
        icon: 'icon-camera'
      },
      {
        name: 'Customer Age',
        url: '/statistic/age',
        icon: 'icon-star'
      },
      {
        name: 'Customer Gender',
        url: '/statistic/gender',
        icon: 'icon-people'
      }
    ]
  },
  {
    name: 'About Us',
    url: '/about',
    icon: 'icon-info '
  },
  {
    name: 'Log out',
    url: '/login',
    icon: 'icon-logout'
  }
];
