import { Ng2FuzhutechCommonPage } from './app.po';

describe('ng2-fuzhutech-common App', () => {
  let page: Ng2FuzhutechCommonPage;

  beforeEach(() => {
    page = new Ng2FuzhutechCommonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
