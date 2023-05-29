export interface Configuration {

  msal: {
    clientId: string;
    tenantId: string;
    audienceId: string;
    apiHostname: string;
    spaHostname: string;
  },
  storage: {
    linkImagesUrl: string;
    pageImagesUrl: string;
    infopageImagesUrl: string;
    alpacaImagesUrl: string;
    alpacaMainImageUrl: string;
    alpacaPedigreeUrl: string;
    alpacaFleeceResultsUrl: string;
    showResultsUrl: string;
  }
}