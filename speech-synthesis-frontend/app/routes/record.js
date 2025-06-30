import Route from '@ember/routing/route';

export default class RecordRoute extends Route {

queryParams = {
  refreshToken: {
    refreshModel: true, // force le modèle à être rechargé
  },
};

}
