export interface Configuration {

  msal: {
    clientId: string;
    tenantId: string;
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