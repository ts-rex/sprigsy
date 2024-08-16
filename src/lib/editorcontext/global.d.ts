// for some reason this doesn't work, I can't figure out why

declare global {
    declare function tune(template: TemplateStringsArray, ...params: string[]): string
    interface Window {
        setTimeout: import('./sprig').sprig.FullSprigAPI['setTimeout'];
        setInterval: sprig.FullSprigAPI['setInterval'];
        clearTimeout: sprig.FullSprigAPI['clearTimeout'];
        clearInterval: sprig.FullSprigAPI['clearInterval'];
    }
}