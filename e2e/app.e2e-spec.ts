import { NewTaskPage } from './app.po';

describe('new-task App', () => {
  let page: NewTaskPage;

  beforeEach(() => {
    page = new NewTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
