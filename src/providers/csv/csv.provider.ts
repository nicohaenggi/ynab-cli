export class CsvProvider {
  static identifier = 'csv' as const;

  public async init() {
    console.log('running init on CsvProvider...');
  }
}
