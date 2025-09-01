import Route from '@ember/routing/route';

export default class HomeRoute extends Route {

  appScreenshots = [
    {
      src: '/assets/1.png',
      alt: 'Interface du tableau de bord',
      title: 'Tableau de bord principal'
    },
    {
      src: '/assets/2.png', 
      alt: 'Page d\'analytics',
      title: 'Rapports et analytics'
    },
    {
      src: '/assets/3.png',
      alt: 'Page des paramètres',
      title: 'Configuration avancée'
    }
  ];


}
