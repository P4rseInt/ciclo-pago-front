export const environment = {
  production: false,
  base_cognito_url: 'https://habitat-portalbase-dev.auth.us-east-1.amazoncognito.com',

  // Datos para el AuthGuard de seguridad-autenticacion-lib
  clientId: 'uj980tk5m64urioj62mpiionn',
  urlRedirectGuard: window.location.origin + '/portal-base-front/',

  sentry: {
    sentry_dsn:
      'https://a2759accc83a11eab5bb0242ac190014@sentrypoc.afphabitat.cl:9000/3',
    sentry_traceSampleRate: 1.0,
    sentry_release: '1.0.0-SNAPSHOT',
    sentry_environment: 'desarrollo',
    sentry_enabled: false
  },
  apisUrl: {
    //obtencionRoles: 'https://azureaddemo.auth.us-west-1.amazoncognito.com/oauth2/userInfo',
    obtencionRoles: 'https://habitat-portalbase-dev.auth.us-east-1.amazoncognito.com/oauth2/userInfo',
    cicloPagoBack: 'http://localhost:8082/api2/v1/ciclopagoback',
    // gestorBack: 'http://localhost:8082/api2/v1/ciclopagoback',
    //gestorBack: 'https://api.dev.afphabitat.cl/cargosabonosback/api2/v1/gestor/cargosabonosback'
  },
  roles: {
    rolElminar: "ROL_GESTOR_CYA_ELIMINAR_DEV,DESARROLLADOR",
    rolEjecutar: "ROL_GESTOR_CY_EJECUTAR_DEV,DESARROLLADOR"
  }
};
