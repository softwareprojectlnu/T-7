import { DocPipe } from './doc.pipe';

describe('DocPipe', () => {
  it('create itemsasarray instance', () => {
    const pipe = new DocPipe();
    expect(pipe).toBeTruthy();
  });
});
