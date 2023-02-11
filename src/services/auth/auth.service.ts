export class AuthService {
  public async isAuthenticated() {
    console.log('running isAuthenticated()');
    return false;
  }

  public async authenticateWithAccessToken(token: string) {
    console.log('running authenticateWithAccessToken()');
    return true;
  }
}
