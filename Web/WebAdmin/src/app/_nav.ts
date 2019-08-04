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
    name: 'Company',
    url: '/company',
    icon: 'icon-layers'
  },
  {
    name: 'Log out',
    url: '/login',
    icon: 'icon-logout'
  }
];
