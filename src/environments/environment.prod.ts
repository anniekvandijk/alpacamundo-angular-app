export const environment = {
    production: true,
    name: 'production',
    clientId: '13f9d129-96e3-4d32-9199-1786494d46ec', 
    loginRedirectUri: 'https://www.alpacamundo.eu',
    postLogoutRedirectUrl: 'http://www.alpacamundo.eu',
    apiBaseUrl: 'http://api.alpacamundo.eu',
    cacheLifetime: 360000,
    storageUrls: {
      linkImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/links/',
      staticPageImagesUrl: '',
      infopageImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/infopages-images/',
      alpacaImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-images/',
      alpacaMainImageUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-images/',
      alpacaPedigreeUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-pedigree/',
      alpacaFleeceResultsUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-fleeceresults/',
      showResultsUrl: 'https://alpacamundostorage.blob.core.windows.net/alpacashow-results/',
      generalUrl: 'https://alpacamundostorage.blob.core.windows.net/files/'
    }
  };