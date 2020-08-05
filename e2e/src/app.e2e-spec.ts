import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
    it('empty test', () => {
        expect('empty test').toEqual('empty test');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
