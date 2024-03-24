export const environment = {
    production: false,
    name: 'test',
    clientId: '13f9d129-96e3-4d32-9199-1786494d46ec', 
    tenantId: "0ef5acdf-6f69-4f04-af24-fa0934009a75",
    loginRedirectUri: 'https://tst.alpacamundo.eu',
    postLogoutRedirectUrl: 'https://tst.alpacamundo.eu',
    apiBaseUrl: 'https://api-tst.alpacamundo.eu', // /swagger/index.html
    cacheLifetime: 600000,
    storageUrls: {
      linkImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/links-test/',
      staticPageImagesUrl: '',
      infopageImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/infopages-images-test/',
      alpacaImagesUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-images-test/',
      alpacaMainImageUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-images-test/',
      alpacaPedigreeUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-pedigree-test/',
      alpacaFleeceResultsUrl: 'https://alpacamundostorage.blob.core.windows.net/alpaca-fleeceresults-test/',
      showResultsUrl: 'https://alpacamundostorage.blob.core.windows.net/alpacashow-results-test/',
      generalUrl: 'https://alpacamundostorage.blob.core.windows.net/files-test/'
    }
  };