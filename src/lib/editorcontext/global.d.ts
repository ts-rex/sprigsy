import "./sprig"

declare global {
    var setTimeout: sprig.FullSprigAPI['setTimeout'];
    var setInterval: sprig.FullSprigAPI['setInterval'];
    var clearTimeout: sprig.FullSprigAPI['clearTimeout'];
    var clearInterval: sprig.FullSprigAPI['clearInterval'];
    
    var tones: typeof sprig['tones']
}