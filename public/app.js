import {
  uiModules
} from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import overviewTemplate from './templates/index.html';
import muteTemplate from './templates/mute.html';

uiRoutes.enable();
uiRoutes
  .when('/', {
    template: overviewTemplate,
    controller: 'elasticsearchStatusController',
    controllerAs: 'ctrl'
  })
  .when('/mute/:name', {
    template: muteTemplate,
    controller: 'muteAlertController',
    controllerAs: 'ctrl'
  });

uiModules
  .get('app/my_alerts')
  .controller('elasticsearchStatusController', function ($http) {
    $http.get('../api/my_alerts/alerts').then((response) => {
      this.alerts = response.data;
    });
  })
  .controller('muteAlertController', function ($routeParams, $http) {
    this.index = $routeParams.name;
    // $http.defaults.headers.common['Authorization'] = 'Basic elastic:Password123!';
    $http.get(`../api/my_alerts/mute/${this.index}`).then((response) => {
      this.status = response.data;
    });
  });
