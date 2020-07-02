export function mockModule(moduleName: string, mockExport: any) {
  const module = require(moduleName);

  for (let key in mockExport) {
    module[key] = mockExport[key];
  }
}
