jest.mock('./src/dynamo/index.ts');
jest.spyOn(console, 'log').mockImplementation(() => {});