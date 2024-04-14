import { IPublicClientApplication, InteractionType, PublicClientApplication } from "@azure/msal-browser"
import { MsalGuardConfiguration } from '@azure/msal-angular';
import { environment } from "src/environments/environment"


const scopes = 
{
  apiWrite: 'api://88dd619d-a72e-49f5-bd69-985cdf0a8a12/access_as_user',
  graphRead: 'user.read'
}

const apiScopeArray = [
  { httpMethod: 'POST', scopes: [scopes.apiWrite] },
  { httpMethod: 'PUT', scopes: [scopes.apiWrite] },
  { httpMethod: 'DELETE', scopes: [scopes.apiWrite] }, 
]

const graphScopeArray = [
  { httpMethod: 'GET', scopes: [scopes.graphRead] },
]

export const msalInstanceConfig: IPublicClientApplication  = new PublicClientApplication(
  { 
  auth: {
      clientId: environment.clientId,
      redirectUri: environment.loginRedirectUri,
      authority: environment.authority
  },
  cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true
  }
  }
);

export const msalGuardConfiguration: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
      scopes: [scopes.apiWrite, scopes.graphRead]
  }
};

export const protectedResourceMap: [string, { httpMethod: string; scopes: string[]; }[]][] = [
  ['https://graph.microsoft.com/v1.0/me', graphScopeArray],
  [`${environment.apiBaseUrl}/api/*`, apiScopeArray] 
];



     
