export function MiniGames() {
  return (
    <>
<dialog aria-describedby="game-intro" aria-labelledby="game-title" className="game-dialog" id="game-dialog">
<div className="game-header">
<div><span className="game-kicker">A little secret adventure · ねこ旅</span><h2 id="game-title">Neko Tabi</h2></div>
<button aria-label="Close mini-game" className="game-close" id="game-close" type="button">×</button>
</div>
<div aria-label="Game progress" className="game-hud">
<span>🪙 Koban <strong id="game-coins">0 / 12</strong></span>
<span>Lives <strong aria-label="3 hearts left" className="game-hearts" id="game-hearts">♥ ♥ ♥</strong></span>
</div>
<div className="game-stage">
<canvas aria-label="Neko Tabi: jump to collect coins and avoid yokai" className="game-canvas" height={430} id="game-canvas" width={900}>Your browser needs canvas to play this mini-game.</canvas>
<div className="game-overlay" id="game-overlay">
<div className="game-message">
<h3 id="game-message-title">A tiny sakura quest</h3>
<p id="game-intro">Collect 12 golden koban. Jump over the little yokai. Three hearts to make it home!</p>
<button className="game-start" id="game-start" type="button">Let's play ✿</button>
</div>
</div>
</div>
<div className="game-controls">
<p>Press <strong>Space</strong>, <strong>↑</strong>, or <strong>W</strong> to jump. Tap the scene or Jump on touch.</p>
<button className="game-jump" id="game-jump" type="button">Jump ↑</button>
</div>
<p aria-live="polite" className="sr-only" id="game-announcement"></p>
</dialog>
<dialog aria-describedby="garden-intro" aria-labelledby="garden-title" className="game-dialog garden-dialog" id="garden-dialog">
<div className="game-header">
<div><span className="game-kicker">A sakura garden to protect · 花守り</span><h2 id="garden-title">Hanamori</h2></div>
<button aria-label="Close garden mini-game" className="game-close" id="garden-close" type="button">×</button>
</div>
<div aria-label="Garden progress" className="game-hud">
<span>✦ Petals <strong id="garden-petals">120</strong></span>
<span>Gate <strong aria-label="3 hearts left" className="game-hearts" id="garden-hearts">♥ ♥ ♥</strong></span>
<span>Wave <strong id="garden-wave">1 / 3</strong></span>
<span>Yokai cleared <strong id="garden-cleared">0 / 9</strong></span>
</div>
<div className="game-stage">
<canvas aria-label="Three-lane garden. Select Sakura or Bamboo, then choose an empty tile. Collect glowing petals and keep yokai from the gate." className="garden-canvas" height={460} id="garden-canvas" tabIndex={0} width={900}>Your browser needs canvas to play this mini-game.</canvas>
<div className="game-overlay" id="garden-overlay">
<div className="game-message">
<h3 id="garden-message-title">Guard the little torii</h3>
<p id="garden-intro">Plant sakura to shoot, bamboo to block. Collect glowing petals and protect the gate through three waves!</p>
<button className="game-start" id="garden-start" type="button">Begin garden ✿</button>
</div>
</div>
</div>
<div aria-label="Choose a guardian plant" className="garden-toolbar" role="group">
<button aria-pressed="true" className="garden-unit" data-unit="sakura" type="button"><span aria-hidden="true" className="garden-unit-icon">✿</span><span><strong>Sakura shooter</strong><small>50 petals · fires seeds</small></span></button>
<button aria-pressed="false" className="garden-unit" data-unit="bamboo" type="button"><span aria-hidden="true" className="garden-unit-icon">▥</span><span><strong>Bamboo wall</strong><small>35 petals · blocks yokai</small></span></button>
</div>
<p className="garden-help">Tap a tile to plant. Tap glowing lights for petals. Keyboard: <strong>1/2</strong> choose, <strong>arrows</strong> move, <strong>Enter</strong> plant.</p>
<p aria-live="polite" className="sr-only" id="garden-announcement"></p>
</dialog>
    </>
  );
}
