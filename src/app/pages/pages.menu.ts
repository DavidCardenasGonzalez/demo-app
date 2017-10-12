export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'sales',
        data: {
          menu: {
            title: 'Ventas',
            icon: 'ion-pricetag',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'customers',
        data: {
          menu: {
            title: 'Clientes',
            icon: 'ion-ios-people',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'products',
        data: {
          menu: {
            title: 'Productos',
            icon: 'ion-clipboard',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'profiles',
        data: {
          menu: {
            title: 'Usuarios',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
];
