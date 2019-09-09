export const navItems = [
  {
    name: 'Profile',
    url: '/profile',
    icon: 'icon-user ',
    children: [
      {
        name: 'Edit Profile',
        url: '/profile/edit',
        icon: 'icon-pencil'
      },
      {
        name: 'Change Password',
        url: '/profile/changepassword',
        icon: 'icon-lock'
      }
    ]
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
        name: 'Zone',
        url: '/statistic/zone',
        icon: 'icon-film'
      },
      {
        name: 'Camera',
        url: '/statistic/camera',
        icon: 'icon-camera'
      }
    ]
  },
  {
    name: 'Log out',
    url: '/login',
    icon: 'icon-logout'
  }
];
