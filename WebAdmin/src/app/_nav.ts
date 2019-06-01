export const navItems = [
  {
    name: 'User',
    url: '/#',
    icon: 'icon-people '
  },
  {
    name: 'Manage Camera',
    url: '/camera',
    icon: 'icon-film',
    children: [
      {
        name: 'Live Preview',
        url: '/camera/live',
        icon: 'icon-control-play'
      },
      {
        name: 'Heatmap',
        url: '/camera/heatmap',
        icon: 'icon-heart'
      }
    ]
  },
  {
    name: 'Statistic',
    url: '/statistic',
    icon: 'icon-graph'
  }
];
