export class YnabService {
  public async getAuthenticatedUser(options?: { accessToken?: string }): Promise<{ id: string } | undefined> {
    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve(null);
      }, 2000);
    });

    return { id: 'uuid' };
  }

  public async retrieveBudgets(): Promise<any[]> {
    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve(null);
      }, 2000);
    });

    return [];
  }
}
