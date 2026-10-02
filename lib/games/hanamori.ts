import { need } from "@/lib/dom";

// Ported from portfolio-game index.html: Hanamori garden mini-game.
// Pet the hero flower 5 times to open a tower-defense garden:
// plant sakura shooters and bamboo walls, collect petals,
// protect the torii through 3 waves.

interface GardenCursor {
  col: number;
  row: number;
}

interface GardenPlant {
  type: string;
  col: number;
  row: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  cooldown: number;
  dead?: boolean;
}

interface GardenEnemy {
  x: number;
  row: number;
  hp: number;
  maxHp: number;
  speed: number;
  bite: number;
  phase: number;
  dead: boolean;
}

interface GardenBullet {
  x: number;
  y: number;
  row: number;
  dead: boolean;
}

interface GardenOrb {
  x: number;
  y: number;
  life: number;
  phase: number;
  collected?: boolean;
}

interface GardenSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface GardenState {
  mode: string;
  time: number;
  petals: number;
  hearts: number;
  cleared: number;
  resolved: number;
  spawned: number;
  nextEnemy: number;
  nextIncome: number;
  nextOrb: number;
  orbIndex: number;
  selected: string;
  cursor: GardenCursor;
  plants: GardenPlant[];
  enemies: GardenEnemy[];
  bullets: GardenBullet[];
  orbs: GardenOrb[];
  sparkles: GardenSparkle[];
}

export function initHanamori(): () => void {
  const cleanups: Array<() => void> = [];
  const flower: HTMLElement = need<HTMLElement>(document.getElementById("hero-flower"));
  const flowerDrawing: HTMLElement = need<HTMLElement>(document.getElementById("flower-drawing"));
  const progress: HTMLElement = need<HTMLElement>(document.getElementById("flower-pet-progress"));
  const dialog: HTMLDialogElement = need<HTMLDialogElement>(document.getElementById("garden-dialog"));
  const canvas: HTMLCanvasElement = need<HTMLCanvasElement>(document.getElementById("garden-canvas"));
  const overlay: HTMLElement = need<HTMLElement>(document.getElementById("garden-overlay"));
  const messageTitle: HTMLElement = need<HTMLElement>(document.getElementById("garden-message-title"));
  const messageText: HTMLElement = need<HTMLElement>(document.getElementById("garden-intro"));
  const startButton: HTMLButtonElement = need<HTMLButtonElement>(document.getElementById("garden-start"));
  const petalsLabel: HTMLElement = need<HTMLElement>(document.getElementById("garden-petals"));
  const heartsLabel: HTMLElement = need<HTMLElement>(document.getElementById("garden-hearts"));
  const waveLabel: HTMLElement = need<HTMLElement>(document.getElementById("garden-wave"));
  const clearedLabel: HTMLElement = need<HTMLElement>(document.getElementById("garden-cleared"));
  const announcement: HTMLElement = need<HTMLElement>(document.getElementById("garden-announcement"));
  const closeButton: HTMLElement = need<HTMLElement>(document.getElementById("garden-close"));
  if (
    !(flower instanceof HTMLElement) ||
    !(flowerDrawing instanceof HTMLElement) ||
    !(progress instanceof HTMLElement) ||
    !(dialog instanceof HTMLDialogElement) ||
    !(canvas instanceof HTMLCanvasElement) ||
    !(overlay instanceof HTMLElement) ||
    !(messageTitle instanceof HTMLElement) ||
    !(messageText instanceof HTMLElement) ||
    !(startButton instanceof HTMLButtonElement) ||
    !(petalsLabel instanceof HTMLElement) ||
    !(heartsLabel instanceof HTMLElement) ||
    !(waveLabel instanceof HTMLElement) ||
    !(clearedLabel instanceof HTMLElement) ||
    !(announcement instanceof HTMLElement) ||
    !closeButton
  ) {
    return () => {};
  }

  const g: CanvasRenderingContext2D = need(canvas.getContext("2d"));

  const on = (
    target:
      | HTMLElement
      | HTMLDialogElement
      | HTMLCanvasElement
      | Window
      | Document,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, listener, options);
    cleanups.push(() => target.removeEventListener(type, listener, options));
  };

  const unitButtons = Array.from(
    dialog.querySelectorAll<HTMLElement>(".garden-unit"),
  );
  const quietMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const W = 900;
  const H = 460;
  const LEFT = 126;
  const TOP = 144;
  const CELL_W = 100;
  const CELL_H = 84;
  const ROWS = 3;
  const COLS = 6;
  const TOTAL = 9;
  const COST: Record<string, number> = { sakura: 50, bamboo: 35 };
  const LANES = [1, 0, 2, 1, 2, 0, 1, 0, 2];
  let taps = 0;
  let launchPending = false;
  let frame = 0;
  let lastFrame = 0;
  let lag = 0;
  let state: GardenState = freshState();

  const centerX = (col: number) => LEFT + (col + 0.5) * CELL_W;
  const centerY = (row: number) => TOP + (row + 0.5) * CELL_H;
  const currentWave = () =>
    Math.min(3, Math.ceil(Math.max(1, state.spawned) / 3));

  function freshState(): GardenState {
    return {
      mode: "ready",
      time: 0,
      petals: 120,
      hearts: 3,
      cleared: 0,
      resolved: 0,
      spawned: 0,
      nextEnemy: 2.3,
      nextIncome: 4,
      nextOrb: 5.4,
      orbIndex: 0,
      selected: "sakura",
      cursor: { col: 2, row: 1 },
      plants: [],
      enemies: [],
      bullets: [],
      orbs: [],
      sparkles: [],
    };
  }

  function updateHud() {
    petalsLabel.textContent = String(state.petals);
    heartsLabel.textContent =
      `${"♥ ".repeat(state.hearts)}${"♡ ".repeat(3 - state.hearts)}`.trim();
    heartsLabel.setAttribute("aria-label", `${state.hearts} hearts left`);
    waveLabel.textContent = `${currentWave()} / 3`;
    clearedLabel.textContent = `${state.cleared} / ${TOTAL}`;
    unitButtons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.unit === state.selected),
      ),
    );
  }

  function showMessage(title: string, description: string, button: string) {
    messageTitle.textContent = title;
    messageText.textContent = description;
    startButton.textContent = button;
    overlay.hidden = false;
  }

  function resetGarden() {
    state = freshState();
    updateHud();
    showMessage(
      "Guard the little torii",
      "Plant sakura to shoot, bamboo to block. Collect glowing petals and protect the gate through three waves!",
      "Begin garden ✿",
    );
    announcement.textContent = "";
    render();
  }

  function startGarden() {
    const selected = state.selected;
    state = freshState();
    state.selected = selected;
    state.mode = "running";
    updateHud();
    overlay.hidden = true;
    announcement.textContent =
      "Garden started. Select a guardian and plant it in an empty tile.";
    canvas.focus({ preventScroll: true });
    render();
  }

  function endGarden(won: boolean) {
    state.mode = won ? "won" : "lost";
    showMessage(
      won ? "The garden is safe! ✿" : "The gate needs you again",
      won
        ? `You protected the torii through all three waves and cleared ${state.cleared} yokai.`
        : `You cleared ${state.cleared} yokai. Try a new planting plan!`,
      "Play again ✿",
    );
    announcement.textContent = won
      ? "You won. The garden is safe."
      : "Game over. The torii lost all three hearts.";
    startButton.focus({ preventScroll: true });
  }

  function selectUnit(unit: string | undefined) {
    if (!unit || !COST[unit]) return;
    state.selected = unit;
    updateHud();
    announcement.textContent = `${unit === "sakura" ? "Sakura shooter" : "Bamboo wall"} selected. ${COST[unit]} petals.`;
  }

  function burst(x: number, y: number, color: string, count = 7) {
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      state.sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * (35 + i * 4),
        vy: Math.sin(angle) * (35 + i * 4) - 13,
        life: 0.52,
        color,
      });
    }
  }

  function placePlant(col: number, row: number) {
    if (
      state.mode !== "running" ||
      col < 0 ||
      col >= COLS ||
      row < 0 ||
      row >= ROWS
    )
      return;
    state.cursor = { col, row };
    if (
      state.plants.some((plant) => plant.col === col && plant.row === row)
    ) {
      announcement.textContent = "That tile already has a guardian.";
      return;
    }
    const cost = COST[state.selected];
    if (state.petals < cost) {
      announcement.textContent = `Need ${cost - state.petals} more petals for ${state.selected}. Collect a glowing light or wait for petals.`;
      return;
    }
    state.petals -= cost;
    state.plants.push({
      type: state.selected,
      col,
      row,
      x: centerX(col),
      y: centerY(row),
      hp: state.selected === "sakura" ? 4 : 10,
      maxHp: state.selected === "sakura" ? 4 : 10,
      cooldown: 0.15,
    });
    burst(
      centerX(col),
      centerY(row),
      state.selected === "sakura" ? "#f3a6bd" : "#9acfb1",
      9,
    );
    updateHud();
    announcement.textContent = `${state.selected} planted in lane ${row + 1}, column ${col + 1}.`;
    render();
  }

  function canvasPoint(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) * W) / bounds.width,
      y: ((event.clientY - bounds.top) * H) / bounds.height,
    };
  }

  function handleCanvasClick(event: PointerEvent) {
    if (state.mode !== "running") return;
    const { x, y } = canvasPoint(event);
    const orb = state.orbs.find(
      (light) => !light.collected && Math.hypot(light.x - x, light.y - y) < 32,
    );
    if (orb) {
      orb.collected = true;
      state.petals += 30;
      burst(orb.x, orb.y, "#ffe18b", 10);
      state.orbs = state.orbs.filter((light) => !light.collected);
      updateHud();
      announcement.textContent = "Thirty petals collected!";
      render();
      return;
    }
    const col = Math.floor((x - LEFT) / CELL_W);
    const row = Math.floor((y - TOP) / CELL_H);
    placePlant(col, row);
  }

  function spawnEnemy() {
    const index = state.spawned;
    const wave = Math.floor(index / 3);
    state.enemies.push({
      x: W + 28,
      row: LANES[index],
      hp: 3 + wave,
      maxHp: 3 + wave,
      speed: 27 + wave * 5,
      bite: 0.9,
      phase: index * 0.7,
      dead: false,
    });
    state.spawned++;
    updateHud();
    if (index % 3 === 0)
      announcement.textContent = `Wave ${wave + 1} approaches the garden.`;
  }

  function spawnOrb() {
    const index = state.orbIndex++;
    state.orbs.push({
      x: 220 + ((index * 137) % 475),
      y: 183 + (index % 3) * 80,
      life: 9,
      phase: index * 1.2,
    });
  }

  function update(dt: number) {
    if (state.mode !== "running") return;
    state.time += dt;
    state.nextEnemy -= dt;
    while (state.nextEnemy <= 0 && state.spawned < TOTAL) {
      spawnEnemy();
      state.nextEnemy += state.spawned < 6 ? 3.35 : 3.05;
    }
    state.nextIncome -= dt;
    while (state.nextIncome <= 0) {
      state.petals += 20;
      state.nextIncome += 4;
      updateHud();
    }
    state.nextOrb -= dt;
    while (state.nextOrb <= 0) {
      spawnOrb();
      state.nextOrb += 5.4;
    }

    for (const plant of state.plants) {
      if (plant.type !== "sakura") continue;
      plant.cooldown -= dt;
      if (plant.cooldown > 0) continue;
      const target = state.enemies.find(
        (enemy) =>
          !enemy.dead && enemy.row === plant.row && enemy.x > plant.x + 15,
      );
      if (target) {
        state.bullets.push({
          x: plant.x + 21,
          y: plant.y - 23,
          row: plant.row,
          dead: false,
        });
        plant.cooldown = 1.08;
      } else plant.cooldown = 0.08;
    }

    for (const bullet of state.bullets) {
      bullet.x += 375 * dt;
      const target = state.enemies.find(
        (enemy) =>
          !enemy.dead &&
          enemy.row === bullet.row &&
          Math.abs(enemy.x - bullet.x) < 21,
      );
      if (!target) continue;
      bullet.dead = true;
      target.hp--;
      burst(target.x, centerY(target.row) - 15, "#f8d873", 4);
      if (target.hp <= 0) {
        target.dead = true;
        state.cleared++;
        state.resolved++;
        state.petals += 12;
        burst(target.x, centerY(target.row), "#d3b7df", 9);
        updateHud();
        announcement.textContent = `${state.cleared} yokai cleared. Twelve petals earned.`;
      }
    }

    for (const enemy of state.enemies) {
      if (enemy.dead) continue;
      const blocker = state.plants.find(
        (plant) =>
          !plant.dead &&
          plant.row === enemy.row &&
          Math.abs(plant.x - enemy.x) < 29,
      );
      if (blocker) {
        enemy.bite -= dt;
        if (enemy.bite <= 0) {
          blocker.hp--;
          enemy.bite = 1.05;
          burst(blocker.x, blocker.y - 13, "#f3a6bd", 3);
          if (blocker.hp <= 0) blocker.dead = true;
        }
      } else enemy.x -= enemy.speed * dt;
      if (enemy.x < 87) {
        enemy.dead = true;
        state.resolved++;
        state.hearts--;
        updateHud();
        announcement.textContent = `${state.hearts} gate hearts left.`;
        if (state.hearts <= 0) {
          endGarden(false);
          break;
        }
      }
    }
    state.plants = state.plants.filter((plant) => !plant.dead);
    state.enemies = state.enemies.filter((enemy) => !enemy.dead);
    state.bullets = state.bullets.filter(
      (bullet) => !bullet.dead && bullet.x < W + 20,
    );
    for (const orb of state.orbs) orb.life -= dt;
    state.orbs = state.orbs.filter((orb) => !orb.collected && orb.life > 0);
    for (const sparkle of state.sparkles) {
      sparkle.x += sparkle.vx * dt;
      sparkle.y += sparkle.vy * dt;
      sparkle.vy += 110 * dt;
      sparkle.life -= dt;
    }
    state.sparkles = state.sparkles.filter((sparkle) => sparkle.life > 0);
    if (
      state.mode === "running" &&
      state.spawned === TOTAL &&
      state.resolved === TOTAL
    )
      endGarden(true);
  }

  function oval(
    x: number,
    y: number,
    rx: number,
    ry: number,
    fill?: string,
    stroke?: string,
    width = 2,
  ) {
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.strokeStyle = stroke;
      g.lineWidth = width;
      g.stroke();
    }
  }

  function box(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill?: string,
    stroke?: string,
    width = 2,
  ) {
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.strokeStyle = stroke;
      g.lineWidth = width;
      g.stroke();
    }
  }

  function drawBackground() {
    const sky = g.createLinearGradient(0, 0, 0, 210);
    sky.addColorStop(0, "#d8e9e6");
    sky.addColorStop(0.6, "#fce0dd");
    sky.addColorStop(1, "#fff3db");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
    oval(766, 65, 44, 44, "#f7dc91");
    oval(766, 65, 57, 57, "rgba(247,220,145,.22)");
    g.fillStyle = "#bfc7d2";
    g.beginPath();
    g.moveTo(300, 169);
    g.lineTo(535, 31);
    g.lineTo(734, 169);
    g.fill();
    g.fillStyle = "#fffaf2";
    g.beginPath();
    g.moveTo(535, 31);
    g.lineTo(578, 71);
    g.lineTo(555, 66);
    g.lineTo(535, 83);
    g.lineTo(513, 67);
    g.lineTo(492, 73);
    g.fill();
    g.fillStyle = "#abc8b4";
    g.beginPath();
    g.moveTo(0, 162);
    g.quadraticCurveTo(160, 90, 292, 160);
    g.quadraticCurveTo(480, 105, 622, 160);
    g.quadraticCurveTo(790, 117, 900, 158);
    g.lineTo(900, 225);
    g.lineTo(0, 225);
    g.fill();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = LEFT + col * CELL_W;
        const y = TOP + row * CELL_H;
        box(
          x + 2,
          y + 2,
          CELL_W - 4,
          CELL_H - 4,
          15,
          (row + col) % 2 ? "#e4f0d9" : "#f1f5df",
          "#c6ddc3",
          1.2,
        );
        oval(x + 21, y + 22, 3.5, 2, "rgba(242,174,194,.65)");
        oval(x + 80, y + 62, 3.5, 2, "rgba(242,174,194,.45)");
      }
    }
    g.fillStyle = "#efe0c7";
    g.fillRect(0, TOP, LEFT - 4, CELL_H * ROWS);
    g.fillRect(
      LEFT + COLS * CELL_W,
      TOP,
      W - LEFT - COLS * CELL_W,
      CELL_H * ROWS,
    );
    g.strokeStyle = "#d6bfae";
    g.lineWidth = 3;
    for (let row = 0; row <= ROWS; row++) {
      const y = TOP + row * CELL_H;
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(W, y);
      g.stroke();
    }
    g.fillStyle = "#dfc3b0";
    g.fillRect(0, TOP + CELL_H * ROWS, W, H - TOP - CELL_H * ROWS);
    for (let i = 0; i < 11; i++)
      oval(35 + i * 86, 422 + (i % 2) * 21, 20, 5, "rgba(255,252,238,.35)");

    g.save();
    g.translate(72, 405);
    box(-34, -235, 13, 237, 2, "#b85f67", "#714658", 2);
    box(21, -235, 13, 237, 2, "#b85f67", "#714658", 2);
    box(-44, -245, 88, 13, 4, "#a85460", "#714658", 2);
    g.fillStyle = "#c36d72";
    g.strokeStyle = "#714658";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(-51, -270);
    g.quadraticCurveTo(0, -253, 51, -270);
    g.lineTo(47, -252);
    g.quadraticCurveTo(0, -239, -47, -252);
    g.closePath();
    g.fill();
    g.stroke();
    box(-6, -248, 12, 15, 2, "#f7df86");
    g.restore();

    g.strokeStyle = "#8d6a76";
    g.lineWidth = 7;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(900, 9);
    g.bezierCurveTo(830, 12, 817, 77, 760, 85);
    g.moveTo(852, 31);
    g.lineTo(864, 107);
    g.moveTo(812, 62);
    g.lineTo(796, 117);
    g.stroke();
    for (const [x, y, r] of [
      [823, 37, 20],
      [861, 65, 24],
      [789, 87, 23],
      [839, 107, 19],
      [779, 54, 15],
    ]) {
      oval(x, y, r, r * 0.75, "#f2b4c7");
      oval(x - 5, y - 5, r * 0.35, r * 0.24, "#ffdae2");
    }
    if (!quietMotion.matches) {
      for (let i = 0; i < 15; i++) {
        const x =
          (((i * 83 + state.time * (12 + (i % 3) * 6)) % 965) + 965) % 965 - 30;
        const y =
          (((i * 51 + state.time * (11 + (i % 4) * 4)) % 390) + 390) % 390;
        oval(x, y, 5, 2.5, "rgba(255,229,236,.8)");
      }
    }
  }

  function drawSakura(plant: GardenPlant) {
    g.save();
    g.translate(plant.x, plant.y);
    oval(0, 29, 27, 7, "rgba(63,95,65,.19)");
    g.strokeStyle = "#559879";
    g.lineWidth = 6;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(0, 24);
    g.lineTo(0, -17);
    g.stroke();
    oval(-12, 7, 15, 7, "#8ac8a0", "#4a8d73", 2);
    oval(13, 9, 15, 7, "#8ac8a0", "#4a8d73", 2);
    for (let i = 0; i < 5; i++) {
      const angle = (-Math.PI / 2 + (i * Math.PI * 2) / 5) as number;
      oval(
        Math.cos(angle) * 17,
        -22 + Math.sin(angle) * 17,
        12,
        12,
        "#fff7f1",
        "#b67392",
        2,
      );
    }
    oval(0, -22, 14, 14, "#f8dc85", "#765664", 2.5);
    oval(-4.5, -24, 1.8, 2.5, "#382b41");
    oval(4.5, -24, 1.8, 2.5, "#382b41");
    g.strokeStyle = "#382b41";
    g.lineWidth = 1.7;
    g.beginPath();
    g.moveTo(-3, -18);
    g.quadraticCurveTo(0, -14, 3, -18);
    g.stroke();
    oval(-9, -17, 3, 2, "#f2aabd");
    oval(9, -17, 3, 2, "#f2aabd");
    g.restore();
  }

  function drawBamboo(plant: GardenPlant) {
    g.save();
    g.translate(plant.x, plant.y);
    oval(0, 28, 28, 7, "rgba(63,95,65,.19)");
    for (const [x, height] of [
      [-16, 49],
      [0, 61],
      [16, 45],
    ]) {
      box(x - 6, 24 - height, 12, height, 5, "#8ccc9d", "#387f66", 2);
      g.strokeStyle = "#387f66";
      g.lineWidth = 2;
      for (let y = 13 - height; y < 20; y += 19) {
        g.beginPath();
        g.moveTo(x - 6, y);
        g.lineTo(x + 6, y);
        g.stroke();
      }
    }
    oval(-23, -20, 13, 6, "#a8ddb0", "#387f66", 1.5);
    oval(23, -29, 13, 6, "#a8ddb0", "#387f66", 1.5);
    oval(-4, -7, 1.5, 2, "#315b52");
    oval(4, -7, 1.5, 2, "#315b52");
    g.strokeStyle = "#315b52";
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(-3, -1);
    g.quadraticCurveTo(0, 2, 3, -1);
    g.stroke();
    g.restore();
  }

  function drawEnemy(enemy: GardenEnemy) {
    const y = centerY(enemy.row);
    g.save();
    g.translate(
      enemy.x,
      y + (quietMotion.matches ? 0 : Math.sin(state.time * 6 + enemy.phase) * 2),
    );
    oval(0, 31, 30, 7, "rgba(77,56,75,.18)");
    g.fillStyle = "#826da1";
    g.strokeStyle = "#382b41";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(-25, -19);
    g.lineTo(-24, -43);
    g.lineTo(-9, -31);
    g.quadraticCurveTo(0, -36, 9, -31);
    g.lineTo(24, -43);
    g.lineTo(25, -19);
    g.closePath();
    g.fill();
    g.stroke();
    oval(0, -2, 28, 33, enemy.maxHp === 5 ? "#9a78b4" : "#b396c7", "#382b41", 3);
    box(-15, -23, 30, 7, 3, "#f7df86", "#765664", 1.5);
    oval(-9, -5, 3, 4, "#382b41");
    oval(9, -5, 3, 4, "#382b41");
    oval(-16, 5, 5, 3, "#f2aabd");
    oval(16, 5, 5, 3, "#f2aabd");
    g.strokeStyle = "#382b41";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-4, 8);
    g.quadraticCurveTo(0, 5, 4, 8);
    g.stroke();
    g.restore();
    box(enemy.x - 19, y - 47, 38, 5, 3, "#f4e9e9");
    box(
      enemy.x - 19,
      y - 47,
      (38 * enemy.hp) / enemy.maxHp,
      5,
      3,
      "#c95883",
    );
  }

  function drawOrb(orb: GardenOrb) {
    const y =
      orb.y + (quietMotion.matches ? 0 : Math.sin(state.time * 4 + orb.phase) * 4);
    oval(orb.x, y, 29, 29, "rgba(255,227,129,.30)");
    oval(orb.x, y, 21, 21, "#ffe390", "#bd8a4d", 2);
    g.fillStyle = "#a97349";
    g.font = "bold 22px Georgia, serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("✦", orb.x, y + 1);
  }

  function render() {
    if (!state) return;
    g.clearRect(0, 0, W, H);
    drawBackground();
    if (state.mode === "running" && state.cursor) {
      g.strokeStyle = "rgba(57,130,98,.75)";
      g.lineWidth = 3;
      g.setLineDash([7, 5]);
      g.strokeRect(
        LEFT + state.cursor.col * CELL_W + 5,
        TOP + state.cursor.row * CELL_H + 5,
        CELL_W - 10,
        CELL_H - 10,
      );
      g.setLineDash([]);
    }
    for (const plant of state.plants) {
      if (plant.type === "sakura") drawSakura(plant);
      else drawBamboo(plant);
      if (plant.hp < plant.maxHp) {
        box(plant.x - 20, plant.y - 59, 40, 4, 2, "#fff9f1");
        box(
          plant.x - 20,
          plant.y - 59,
          (40 * plant.hp) / plant.maxHp,
          4,
          2,
          "#66a881",
        );
      }
    }
    for (const bullet of state.bullets) {
      oval(bullet.x, bullet.y, 9, 6, "#f8d873", "#a67548", 1.5);
      oval(bullet.x - 11, bullet.y, 5, 2, "rgba(255,242,192,.55)");
    }
    for (const enemy of state.enemies) drawEnemy(enemy);
    for (const orb of state.orbs) drawOrb(orb);
    for (const sparkle of state.sparkles) {
      g.globalAlpha = Math.max(0, sparkle.life * 1.9);
      oval(sparkle.x, sparkle.y, 4, 4, sparkle.color);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(54,88,73,.72)";
    g.font = "bold 17px Georgia, serif";
    g.textAlign = "left";
    g.fillText("花守り", 18, 29);
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

  function openGarden() {
    if (!dialog.open) dialog.showModal();
    resetGarden();
    lastFrame = 0;
    lag = 0;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(loop);
    startButton.focus({ preventScroll: true });
  }

  function petFlower() {
    if (launchPending) return;
    taps++;
    flower.dataset.expression = taps >= 4 ? "surprised" : "happy";
    progress.hidden = false;
    progress.textContent =
      taps === 1
        ? "Bloom! 1 / 5 ✿"
        : taps === 4
          ? "Oh! 4 / 5 ✦"
          : taps === 5
            ? "Garden unlocked! ✿"
            : `bloom ${taps} / 5 ✿`;
    for (const element of [flowerDrawing, progress]) {
      element.classList.remove("is-petted");
      void element.getBoundingClientRect();
      element.classList.add("is-petted");
    }
    if (taps < 5) return;
    launchPending = true;
    taps = 0;
    setTimeout(
      () => {
        progress.hidden = true;
        launchPending = false;
        openGarden();
      },
      quietMotion.matches ? 0 : 500,
    );
  }

  on(flower, "click", petFlower as EventListener);
  on(flower, "keydown", ((event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    petFlower();
  }) as EventListener);
  on(closeButton, "click", (() => dialog.close()) as EventListener);
  on(dialog, "close", () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    state.mode = "closed";
    flower.removeAttribute("data-expression");
    flowerDrawing.classList.remove("is-petted");
    flower.focus({ preventScroll: true });
  });
  on(startButton, "click", startGarden as EventListener);
  unitButtons.forEach((button) =>
    on(button, "click", (() =>
      selectUnit(button.dataset.unit)) as EventListener),
  );
  on(canvas, "pointerdown", ((event: PointerEvent) =>
    handleCanvasClick(event)) as EventListener);
  on(canvas, "pointermove", ((event: PointerEvent) => {
    if (state.mode !== "running" || event.pointerType === "touch") return;
    const { x, y } = canvasPoint(event);
    const col = Math.floor((x - LEFT) / CELL_W);
    const row = Math.floor((y - TOP) / CELL_H);
    if (col >= 0 && col < COLS && row >= 0 && row < ROWS)
      state.cursor = { col, row };
  }) as EventListener);
  on(dialog, "keydown", ((event: KeyboardEvent) => {
    if (event.code === "Digit1" || event.code === "Digit2") {
      selectUnit(event.code === "Digit1" ? "sakura" : "bamboo");
      return;
    }
    if (event.target !== canvas || state.mode !== "running") return;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    if (moves[event.code]) {
      event.preventDefault();
      state.cursor.col = Math.max(
        0,
        Math.min(COLS - 1, state.cursor.col + moves[event.code][0]),
      );
      state.cursor.row = Math.max(
        0,
        Math.min(ROWS - 1, state.cursor.row + moves[event.code][1]),
      );
    } else if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      placePlant(state.cursor.col, state.cursor.row);
    }
  }) as EventListener);
  on(document, "visibilitychange", () => {
    lastFrame = 0;
  });

  window.render_garden_game_to_text = () =>
    JSON.stringify({
      coordinates:
        "canvas 900x460; origin top-left; x right, y down; grid columns 0-5, rows 0-2",
      mode: state.mode,
      petals: state.petals,
      gateHearts: state.hearts,
      wave: currentWave(),
      cleared: state.cleared,
      selected: state.selected,
      cursor: state.cursor,
      plants: state.plants.map((plant) => ({
        type: plant.type,
        col: plant.col,
        row: plant.row,
        hp: plant.hp,
      })),
      enemies: state.enemies.map((enemy) => ({
        x: Math.round(enemy.x),
        row: enemy.row,
        hp: enemy.hp,
      })),
      orbs: state.orbs.map((orb) => ({ x: orb.x, y: orb.y })),
    });
  window.advanceGardenTime = (ms: number) => {
    const steps = Math.max(0, Math.min(1800, Math.round(ms / (1000 / 60))));
    for (let i = 0; i < steps; i++) update(1 / 60);
    render();
  };
  resetGarden();

  return () => {
    cancelAnimationFrame(frame);
    cleanups.forEach((fn) => fn());
  };
}
