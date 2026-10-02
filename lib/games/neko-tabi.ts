import { need } from "@/lib/dom";

// Ported from portfolio-game index.html: Neko Tabi mini-game.
// Pet the hero cat 5 times to open a canvas runner: collect 12 koban,
// jump over yokai, 3 hearts.

type NekoItemType = "coin" | "enemy";

interface NekoSpawnDef {
  type: NekoItemType;
  height?: number;
}

interface NekoItem extends NekoSpawnDef {
  x: number;
  bob: number;
  collected?: boolean;
}

interface NekoParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface NekoCatBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface NekoState {
  mode: string;
  time: number;
  distance: number;
  coins: number;
  hearts: number;
  catY: number;
  catVelocity: number;
  invincible: number;
  items: NekoItem[];
  particles: NekoParticle[];
  nextSpawn: number;
  spawnIndex: number;
}

export function initNekoTabi(): () => void {
  const cleanups: Array<() => void> = [];
  const heroCat: HTMLElement = need<HTMLElement>(document.getElementById("hero-cat"));
  const catDrawing: HTMLElement = need<HTMLElement>(document.getElementById("cat-drawing"));
  const petProgress: HTMLElement = need<HTMLElement>(document.getElementById("cat-pet-progress"));
  const dialog: HTMLDialogElement = need<HTMLDialogElement>(document.getElementById("game-dialog"));
  const canvas: HTMLCanvasElement = need<HTMLCanvasElement>(document.getElementById("game-canvas"));
  const overlay: HTMLElement = need<HTMLElement>(document.getElementById("game-overlay"));
  const messageTitle: HTMLElement = need<HTMLElement>(document.getElementById("game-message-title"));
  const messageText: HTMLElement = need<HTMLElement>(document.getElementById("game-intro"));
  const startButton: HTMLButtonElement = need<HTMLButtonElement>(document.getElementById("game-start"));
  const jumpButton: HTMLButtonElement = need<HTMLButtonElement>(document.getElementById("game-jump"));
  const coinsLabel: HTMLElement = need<HTMLElement>(document.getElementById("game-coins"));
  const heartsLabel: HTMLElement = need<HTMLElement>(document.getElementById("game-hearts"));
  const announcement: HTMLElement = need<HTMLElement>(document.getElementById("game-announcement"));
  const closeButton: HTMLElement = need<HTMLElement>(document.getElementById("game-close"));
  if (
    !(heroCat instanceof HTMLElement) ||
    !(catDrawing instanceof HTMLElement) ||
    !(petProgress instanceof HTMLElement) ||
    !(dialog instanceof HTMLDialogElement) ||
    !(canvas instanceof HTMLCanvasElement) ||
    !(overlay instanceof HTMLElement) ||
    !(messageTitle instanceof HTMLElement) ||
    !(messageText instanceof HTMLElement) ||
    !(startButton instanceof HTMLButtonElement) ||
    !(jumpButton instanceof HTMLButtonElement) ||
    !(coinsLabel instanceof HTMLElement) ||
    !(heartsLabel instanceof HTMLElement) ||
    !(announcement instanceof HTMLElement) ||
    !closeButton
  ) {
    return () => {};
  }

  const g: CanvasRenderingContext2D = need(canvas.getContext("2d"));

  const on = (
    target: HTMLElement | HTMLDialogElement | HTMLCanvasElement | Window | Document,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, listener, options);
    cleanups.push(() => target.removeEventListener(type, listener, options));
  };

  const quietMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const W = 900;
  const H = 430;
  const GROUND = 334;
  const CAT_X = 145;
  const TARGET = 12;
  const SPAWN_PATTERN: NekoSpawnDef[] = [
    { type: "coin", height: 70 },
    { type: "coin", height: 130 },
    { type: "enemy" },
    { type: "coin", height: 70 },
    { type: "coin", height: 115 },
    { type: "enemy" },
    { type: "coin", height: 70 },
    { type: "coin", height: 130 },
    { type: "enemy" },
  ];
  let petCount = 0;
  let launchPending = false;
  let frame = 0;
  let lastFrame = 0;
  let lag = 0;
  let state: NekoState = freshState();

  function freshState(): NekoState {
    return {
      mode: "ready",
      time: 0,
      distance: 0,
      coins: 0,
      hearts: 3,
      catY: 0,
      catVelocity: 0,
      invincible: 0,
      items: [],
      particles: [],
      nextSpawn: 0.65,
      spawnIndex: 0,
    };
  }

  function updateHud() {
    coinsLabel.textContent = `${state.coins} / ${TARGET}`;
    heartsLabel.textContent =
      `${"♥ ".repeat(state.hearts)}${"♡ ".repeat(3 - state.hearts)}`.trim();
    heartsLabel.setAttribute("aria-label", `${state.hearts} hearts left`);
  }

  function showMessage(title: string, description: string, button: string) {
    messageTitle.textContent = title;
    messageText.textContent = description;
    startButton.textContent = button;
    overlay.hidden = false;
  }

  function resetGame() {
    state = freshState();
    updateHud();
    showMessage(
      "A tiny sakura quest",
      "Collect 12 golden koban. Jump over the little yokai. Three hearts to make it home!",
      "Let's play ✿",
    );
    announcement.textContent = "";
    render();
  }

  function startGame() {
    state = freshState();
    state.mode = "running";
    updateHud();
    overlay.hidden = true;
    announcement.textContent =
      "Game started. Jump to collect coins and avoid yokai.";
    jumpButton.focus({ preventScroll: true });
    render();
  }

  function finishGame(won: boolean) {
    state.mode = won ? "won" : "lost";
    showMessage(
      won ? "おめでとう!" : "Take a little breather",
      won
        ? "You gathered 12 koban and made it through the sakura path!"
        : `You found ${state.coins} koban. The yokai are ready for another round.`,
      "Play again ✿",
    );
    announcement.textContent = won
      ? "You won. Twelve coins collected."
      : "Game over. All three hearts lost.";
    startButton.focus({ preventScroll: true });
  }

  function burst(x: number, y: number, color: string, amount = 8) {
    for (let i = 0; i < amount; i++) {
      const angle = (Math.PI * 2 * i) / amount;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * (60 + i * 5),
        vy: Math.sin(angle) * (60 + i * 5) - 20,
        life: 0.5,
        color,
      });
    }
  }

  function jump() {
    if (state.mode !== "running" || state.catY > 0) return;
    state.catVelocity = 655;
    burst(CAT_X, GROUND - 8, "#fff4d0", 5);
  }

  function spawn() {
    const item = SPAWN_PATTERN[state.spawnIndex % SPAWN_PATTERN.length];
    state.items.push({ ...item, x: W + 30, bob: state.spawnIndex * 0.8 });
    state.spawnIndex++;
  }

  function intersectsCoin(item: NekoItem, cat: NekoCatBox) {
    const coinY =
      GROUND - (item.height ?? 0) + Math.sin(state.time * 5 + item.bob) * 3;
    const nearX = Math.max(cat.left, Math.min(item.x, cat.right));
    const nearY = Math.max(cat.top, Math.min(coinY, cat.bottom));
    return (item.x - nearX) ** 2 + (coinY - nearY) ** 2 < 19 ** 2;
  }

  function update(dt: number) {
    if (state.mode !== "running") return;
    state.time += dt;
    const speed = 285 + Math.min(55, state.time * 1.35);
    state.distance += speed * dt;
    state.nextSpawn -= dt;
    while (state.nextSpawn <= 0) {
      spawn();
      state.nextSpawn += 1.16;
    }

    if (state.catY > 0 || state.catVelocity > 0) {
      state.catY += state.catVelocity * dt;
      state.catVelocity -= 1680 * dt;
      if (state.catY <= 0) {
        state.catY = 0;
        state.catVelocity = 0;
      }
    }
    state.invincible = Math.max(0, state.invincible - dt);
    const cat: NekoCatBox = {
      left: CAT_X - 26,
      right: CAT_X + 26,
      top: GROUND - state.catY - 64,
      bottom: GROUND - state.catY - 4,
    };

    for (const item of state.items) {
      item.x -= speed * dt;
      if (item.type === "coin" && intersectsCoin(item, cat)) {
        item.collected = true;
        state.coins++;
        burst(item.x, GROUND - (item.height ?? 0), "#f7cf65");
        updateHud();
        announcement.textContent = `${state.coins} of ${TARGET} koban collected.`;
        if (state.coins >= TARGET) {
          finishGame(true);
          break;
        }
      }
      if (
        item.type === "enemy" &&
        state.invincible === 0 &&
        cat.right > item.x - 23 &&
        cat.left < item.x + 23 &&
        cat.bottom > GROUND - 47 &&
        cat.top < GROUND - 5
      ) {
        item.collected = true;
        state.hearts--;
        state.invincible = 1.3;
        burst(CAT_X, GROUND - state.catY - 35, "#f3a6bd");
        updateHud();
        announcement.textContent = `${state.hearts} hearts left.`;
        if (state.hearts <= 0) {
          finishGame(false);
          break;
        }
      }
    }
    state.items = state.items.filter(
      (item) => !item.collected && item.x > -45,
    );
    for (const particle of state.particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 130 * dt;
      particle.life -= dt;
    }
    state.particles = state.particles.filter(
      (particle) => particle.life > 0,
    );
  }

  function roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fill?: string,
    stroke?: string,
    lineWidth = 2,
  ) {
    g.beginPath();
    g.roundRect(x, y, width, height, radius);
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.strokeStyle = stroke;
      g.lineWidth = lineWidth;
      g.stroke();
    }
  }

  function ellipse(
    x: number,
    y: number,
    rx: number,
    ry: number,
    fill?: string,
    stroke?: string,
    lineWidth = 2,
  ) {
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.strokeStyle = stroke;
      g.lineWidth = lineWidth;
      g.stroke();
    }
  }

  function drawCloud(x: number, y: number, scale = 1) {
    g.save();
    g.translate(x, y);
    g.scale(scale, scale);
    g.globalAlpha = 0.75;
    ellipse(-25, 2, 32, 14, "#fffefa");
    ellipse(2, -8, 31, 20, "#fffefa");
    ellipse(34, 3, 30, 13, "#fffefa");
    g.restore();
  }

  function drawTorii(x: number, y: number, scale = 1) {
    g.save();
    g.translate(x, y);
    g.scale(scale, scale);
    g.fillStyle = "#a95865";
    roundRect(-50, -85, 12, 83, 2, "#a95865");
    roundRect(38, -85, 12, 83, 2, "#a95865");
    roundRect(-57, -86, 114, 10, 3, "#88475a");
    g.beginPath();
    g.moveTo(-66, -104);
    g.quadraticCurveTo(0, -88, 66, -104);
    g.lineTo(61, -91);
    g.quadraticCurveTo(0, -76, -61, -91);
    g.closePath();
    g.fillStyle = "#b76068";
    g.fill();
    roundRect(-7, -84, 14, 15, 2, "#f7df86");
    g.restore();
  }

  function drawSakuraTree(x: number, y: number, scale = 1) {
    g.save();
    g.translate(x, y);
    g.scale(scale, scale);
    g.strokeStyle = "#9d7180";
    g.lineWidth = 8;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(-3, -75);
    g.lineTo(-29, -104);
    g.moveTo(-3, -75);
    g.lineTo(30, -108);
    g.stroke();
    for (const [px, py, r] of [
      [-34, -106, 31],
      [-8, -118, 36],
      [25, -111, 32],
      [-18, -86, 28],
      [39, -90, 24],
    ]) {
      ellipse(px, py, r, r * 0.76, "#f2b4c7");
      ellipse(px - 8, py - 8, r * 0.43, r * 0.28, "#ffd7df");
    }
    g.restore();
  }

  function drawLandscape() {
    const sky = g.createLinearGradient(0, 0, 0, GROUND);
    sky.addColorStop(0, "#e8dff4");
    sky.addColorStop(0.64, "#ffe1df");
    sky.addColorStop(1, "#fff3de");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
    ellipse(703, 99, 55, 55, "#f7d989");
    ellipse(703, 99, 68, 68, "rgba(247,217,137,.22)");
    for (let i = 0; i < 4; i++) {
      const x =
        (((i * 295 + 95 - state.distance * (quietMotion.matches ? 0 : 0.08)) %
          1180) +
          1180) %
          1180 -
        90;
      drawCloud(x, 67 + (i % 2) * 58, 0.75 + i * 0.05);
    }
    g.fillStyle = "#c4bbd7";
    g.beginPath();
    g.moveTo(250, 304);
    g.lineTo(615, 111);
    g.lineTo(885, 304);
    g.closePath();
    g.fill();
    g.fillStyle = "#fff8ef";
    g.beginPath();
    g.moveTo(615, 111);
    g.lineTo(667, 160);
    g.lineTo(643, 157);
    g.lineTo(618, 172);
    g.lineTo(595, 156);
    g.lineTo(574, 165);
    g.closePath();
    g.fill();
    g.fillStyle = "#b7cbbf";
    g.beginPath();
    g.moveTo(0, 307);
    g.quadraticCurveTo(110, 232, 223, 296);
    g.quadraticCurveTo(370, 246, 478, 301);
    g.quadraticCurveTo(660, 258, 900, 297);
    g.lineTo(900, 340);
    g.lineTo(0, 340);
    g.fill();
    for (let i = 0; i < 5; i++) {
      const x =
        (((i * 305 + 120 - state.distance * (quietMotion.matches ? 0 : 0.25)) %
          1440) +
          1440) %
          1440 -
        165;
      drawSakuraTree(x, 311, 0.55 + (i % 2) * 0.12);
    }
    for (let i = 0; i < 3; i++) {
      const x =
        (((i * 590 + 425 - state.distance * (quietMotion.matches ? 0 : 0.37)) %
          1770) +
          1770) %
          1770 -
        100;
      drawTorii(x, 307, 0.66);
    }
    g.fillStyle = "#a5d4b9";
    g.fillRect(0, GROUND - 15, W, 26);
    g.fillStyle = "#e9baa7";
    g.fillRect(0, GROUND + 10, W, H - GROUND);
    g.fillStyle = "#f4d3b8";
    g.fillRect(0, GROUND + 13, W, 11);
    for (let i = 0; i < 13; i++) {
      const x = (((i * 86 - state.distance) % 1118) + 1118) % 1118 - 90;
      ellipse(x, GROUND + 49 + (i % 2) * 24, 19, 5, "rgba(255,248,231,.42)");
      g.strokeStyle = "#719e7c";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(x + 16, GROUND + 8);
      g.lineTo(x + 20, GROUND - 2);
      g.lineTo(x + 24, GROUND + 8);
      g.stroke();
    }
    if (!quietMotion.matches) {
      for (let i = 0; i < 17; i++) {
        const x =
          (((i * 93 + state.time * (24 + (i % 3) * 9)) % 990) + 990) % 990 - 35;
        const y =
          (((i * 61 + state.time * (17 + (i % 4) * 6)) % 350) + 350) % 350 - 15;
        ellipse(x, y, 5, 2.8, i % 2 ? "#ffd4df" : "#fff6f5");
      }
    }
  }

  function drawCoin(item: NekoItem) {
    const y =
      GROUND - (item.height ?? 0) + Math.sin(state.time * 5 + item.bob) * 3;
    g.save();
    g.translate(item.x, y);
    g.rotate(Math.sin(state.time * 3 + item.bob) * 0.09);
    ellipse(0, 0, 18, 23, "#f8ce69", "#8f5c38", 3);
    ellipse(0, 0, 12, 17, "#ffe99b", "#c28a49", 1.5);
    g.fillStyle = "#8b623d";
    g.font = "bold 18px Georgia, serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("小", 0, 1);
    g.restore();
  }

  function drawEnemy(item: NekoItem) {
    g.save();
    g.translate(
      item.x,
      GROUND + (quietMotion.matches ? 0 : Math.sin(state.time * 8 + item.bob) * 2),
    );
    ellipse(0, 3, 27, 6, "rgba(69,46,73,.19)");
    g.fillStyle = "#9e79b6";
    g.strokeStyle = "#382b41";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(-21, -34);
    g.lineTo(-24, -53);
    g.lineTo(-8, -41);
    g.quadraticCurveTo(0, -48, 8, -41);
    g.lineTo(24, -53);
    g.lineTo(21, -34);
    g.closePath();
    g.fill();
    g.stroke();
    ellipse(0, -22, 25, 23, "#ad8bc1", "#382b41", 3);
    ellipse(-8, -25, 3, 4, "#382b41");
    ellipse(8, -25, 3, 4, "#382b41");
    ellipse(-14, -15, 5, 3, "#f3a6bd");
    ellipse(14, -15, 5, 3, "#f3a6bd");
    g.strokeStyle = "#382b41";
    g.lineWidth = 2;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(-4, -15);
    g.quadraticCurveTo(0, -11, 4, -15);
    g.stroke();
    g.fillStyle = "#fff9f1";
    g.beginPath();
    g.moveTo(-2, -14);
    g.lineTo(0, -9);
    g.lineTo(2, -14);
    g.fill();
    g.restore();
  }

  function drawCat() {
    ellipse(
      CAT_X,
      GROUND + 3,
      Math.max(13, 31 - state.catY * 0.11),
      6,
      "rgba(65,45,61,.18)",
    );
    if (state.invincible > 0 && Math.floor(state.time * 11) % 2) return;
    g.save();
    g.translate(CAT_X, GROUND - state.catY);
    g.strokeStyle = "#30253a";
    g.lineWidth = 9;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(22, -25);
    g.bezierCurveTo(59, -47, 58, -14, 47, -11);
    g.stroke();
    ellipse(0, -25, 27, 24, "#fff1e5", "#30253a", 3);
    g.fillStyle = "#fff1e5";
    g.strokeStyle = "#30253a";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(-25, -49);
    g.lineTo(-23, -75);
    g.lineTo(-7, -59);
    g.quadraticCurveTo(0, -63, 7, -59);
    g.lineTo(23, -75);
    g.lineTo(25, -49);
    g.closePath();
    g.fill();
    g.stroke();
    g.fillStyle = "#f3a6bd";
    g.beginPath();
    g.moveTo(-20, -57);
    g.lineTo(-20, -68);
    g.lineTo(-11, -59);
    g.moveTo(20, -57);
    g.lineTo(20, -68);
    g.lineTo(11, -59);
    g.fill();
    ellipse(0, -45, 29, 23, "#fff1e5", "#30253a", 3);
    g.strokeStyle = "#30253a";
    g.lineWidth = 2.6;
    g.beginPath();
    g.moveTo(-18, -48);
    g.quadraticCurveTo(-12, -55, -6, -48);
    g.moveTo(6, -48);
    g.quadraticCurveTo(12, -55, 18, -48);
    g.stroke();
    ellipse(-18, -39, 6, 3.5, "#f6b7c5");
    ellipse(18, -39, 6, 3.5, "#f6b7c5");
    g.fillStyle = "#c95883";
    g.beginPath();
    g.moveTo(-4, -43);
    g.quadraticCurveTo(0, -38, 4, -43);
    g.closePath();
    g.fill();
    g.beginPath();
    g.moveTo(0, -40);
    g.quadraticCurveTo(-4, -35, -8, -38);
    g.moveTo(0, -40);
    g.quadraticCurveTo(4, -35, 8, -38);
    g.stroke();
    g.beginPath();
    g.moveTo(-23, -39);
    g.lineTo(-33, -42);
    g.moveTo(-23, -35);
    g.lineTo(-33, -33);
    g.moveTo(23, -39);
    g.lineTo(33, -42);
    g.moveTo(23, -35);
    g.lineTo(33, -33);
    g.stroke();
    roundRect(-17, -10, 15, 12, 6, "#fff1e5", "#30253a", 2);
    roundRect(3, -10, 15, 12, 6, "#fff1e5", "#30253a", 2);
    g.fillStyle = "#c95883";
    g.beginPath();
    g.moveTo(-15, -24);
    g.lineTo(0, -15);
    g.lineTo(15, -24);
    g.quadraticCurveTo(0, -17, -15, -24);
    g.fill();
    ellipse(0, -17, 4, 4, "#f7df86", "#8f5c38", 1);
    g.restore();
  }

  function render() {
    if (!state) return;
    g.clearRect(0, 0, W, H);
    drawLandscape();
    for (const item of state.items) {
      if (item.type === "coin") drawCoin(item);
      else drawEnemy(item);
    }
    drawCat();
    for (const particle of state.particles) {
      g.globalAlpha = Math.max(0, particle.life * 2);
      ellipse(particle.x, particle.y, 4, 4, particle.color);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(77,51,73,.65)";
    g.font = "bold 17px Georgia, serif";
    g.textAlign = "right";
    g.fillText("ねこ旅", 878, 31);
  }

  function loop(now: number) {
    if (!dialog.open) return;
    if (lastFrame) lag += Math.min(50, now - lastFrame);
    lastFrame = now;
    while (lag >= 1000 / 60) {
      update(1 / 60);
      lag -= 1000 / 60;
    }
    render();
    frame = requestAnimationFrame(loop);
  }

  function openGame() {
    if (!dialog.open) dialog.showModal();
    resetGame();
    lastFrame = 0;
    lag = 0;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(loop);
    startButton.focus({ preventScroll: true });
  }

  function petCat() {
    if (launchPending) return;
    petCount++;
    heroCat.dataset.expression = petCount >= 4 ? "surprised" : "happy";
    petProgress.hidden = false;
    petProgress.textContent =
      petCount === 1
        ? "Purr! 1 / 5 ♥"
        : petCount === 4
          ? "Whoa! 4 / 5 ✦"
          : petCount === 5
            ? "Adventure unlocked! ✿"
            : `purr ${petCount} / 5 ♥`;
    for (const element of [catDrawing, petProgress]) {
      element.classList.remove("is-petted");
      void element.getBoundingClientRect();
      element.classList.add("is-petted");
    }
    if (petCount < 5) {
      return;
    }
    launchPending = true;
    petCount = 0;
    setTimeout(
      () => {
        petProgress.hidden = true;
        launchPending = false;
        openGame();
      },
      quietMotion.matches ? 0 : 480,
    );
  }

  on(heroCat, "click", petCat);
  on(heroCat, "keydown", ((event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    petCat();
  }) as EventListener);
  on(closeButton, "click", () => dialog.close());
  on(dialog, "close", () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    state.mode = "closed";
    heroCat.removeAttribute("data-expression");
    catDrawing.classList.remove("is-petted");
    heroCat.focus({ preventScroll: true });
  });
  on(startButton, "click", startGame);
  on(jumpButton, "click", jump);
  on(canvas, "pointerdown", jump as EventListener);
  on(window, "keydown", ((event: KeyboardEvent) => {
    if (!dialog.open) return;
    if (
      event.code === "ArrowUp" ||
      event.code === "KeyW" ||
      event.code === "Space"
    ) {
      if (event.code === "Space" && event.target instanceof HTMLButtonElement)
        return;
      event.preventDefault();
      jump();
    }
  }) as EventListener);
  on(document, "visibilitychange", () => {
    lastFrame = 0;
  });

  window.render_game_to_text = () =>
    JSON.stringify({
      coordinates: "canvas 900x430; origin top-left; x right, y down",
      mode: state.mode,
      target: TARGET,
      coins: state.coins,
      hearts: state.hearts,
      player: {
        x: CAT_X,
        feetY: Math.round(GROUND - state.catY),
        velocityUp: Math.round(state.catVelocity),
      },
      entities: state.items
        .filter((item) => item.x > -45 && item.x < W + 45)
        .map((item) => ({
          type: item.type,
          x: Math.round(item.x),
          y:
            item.type === "coin"
              ? Math.round(GROUND - (item.height ?? 0))
              : GROUND,
        })),
    });
  window.advanceTime = (ms: number) => {
    const steps = Math.max(0, Math.min(1800, Math.round(ms / (1000 / 60))));
    for (let i = 0; i < steps; i++) update(1 / 60);
    render();
  };
  resetGame();

  return () => {
    cancelAnimationFrame(frame);
    cleanups.forEach((fn) => fn());
  };
}
