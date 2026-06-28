# Poker AI Web — Learning Card-Game AI Platform Quality Pass

## Independent Analysis
- Portfolio slug: `poker-ai-web`
- Local repo: present
- Source type: Web/Node
- README: portfolio-grade; updated-quality-section
- Install: passed via npm install --ignore-scripts
- Run: no verified run command detected
- Build: no build script
- Test: failed: failed (1)
- Lint: no lint script detected

## Assets
- Screenshots: real screenshots present; captured 4 new
- Demo video: real video present
- Deployment: external live demo link present

## Copied / Captured Assets
- /projects/poker-ai-web/videos/playwright-external-live-demo.webm
- /projects/poker-ai-web/screenshots/01-overview.png
- /projects/poker-ai-web/screenshots/02-core-feature.png
- /projects/poker-ai-web/screenshots/03-detail-view.png
- /projects/poker-ai-web/screenshots/04-architecture-or-data-flow.png

## Manual Follow-up Needed
- None.

## Notes
- Test output tail:     707|       throw new Error(`Invalid move: ${validation.reason}`);
       |             ^
    708|     }
    709| 
 ❯ tests/unit/TexasHoldemGame.test.js:764:43
 ❯ tests/unit/TexasHoldemGame.test.js:764:25

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/26]⎯

 FAIL  tests/unit/TexasHoldemGame.test.js > TexasHoldemGame > Serialization > should serialize game state to JSON
TypeError: game.toJSON is not a function
 ❯ tests/unit/TexasHoldemGame.test.js:791:25
    789| 
    790|     it('should serialize game state to JSON', () => {
    791|       const json = game.toJSON();
       |                         ^
    792| 
    793|       expect(json).toHaveProperty('state');

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[24/26]⎯

 FAIL  tests/unit/TexasHoldemGame.test.js > TexasHoldemGame > Serialization > should include poker-specific data in serialization
TypeError: game.toJSON is not a function
 ❯ tests/unit/TexasHoldemGame.test.js:802:25
    800| 
    801|     it('should include poker-specific data in serialization', () => {
    802|       const json = game.toJSON();
       |                         ^
    803| 
    804|       expect(json).toHaveProperty('smallBlind');

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[25/26]⎯

 FAIL  tests/unit/TexasHoldemGame.test.js > TexasHoldemGame > Serialization > should serialize player hands
TypeError: game.toJSON is not a function
 ❯ tests/unit/TexasHoldemGame.test.js:812:25
    810| 
    811|     it('should serialize player hands', () => {
    812|       const json = game.toJSON();
       |                         ^
    813| 
    814|       json.players.forEach(player => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[26/26]⎯
