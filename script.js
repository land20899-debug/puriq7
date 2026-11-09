const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const titleEl = document.getElementById('title');
const narrationEl = document.getElementById('narration');
const toggleBtn = document.getElementById('toggle');
const restartBtn = document.getElementById('restart');

const totalDuration = 92;
let playing = false;
let startTime = 0;
let elapsed = 0;

const scenes = [
  {
    start: 0,
    end: 14,
    title: 'Andrei Chikatilo',
    text: 'In the Soviet Union, one man lived a quiet, ordinary life while carrying a deeply hidden violence that would later haunt the nation.',
    draw: drawVillageScene,
  },
  {
    start: 14,
    end: 28,
    title: 'A troubled youth',
    text: 'Born in 1936, Chikatilo grew up in harsh conditions marked by poverty, social rejection, and emotional isolation.',
    draw: drawSchoolScene,
  },
  {
    start: 28,
    end: 43,
    title: 'The killings begin',
    text: 'Across the 1970s, a pattern of murders emerged across Soviet cities and rural routes, often targeting vulnerable people.',
    draw: drawCrimeMapScene,
  },
  {
    start: 43,
    end: 63,
    title: 'A killer in plain sight',
    text: 'He used public spaces, long distances, and the chaos of the era to remain unseen while investigators struggled to connect the crimes.',
    draw: drawCityScene,
  },
  {
    start: 63,
    end: 78,
    title: 'The investigation',
    text: 'Police followed leads across regions, but weak coordination and limited forensic tools slowed the search for the truth.',
    draw: drawInvestigationScene,
  },
  {
    start: 78,
    end: 92,
    title: 'The legacy',
    text: 'Arrested in 1990 and executed in 1994, Chikatilo remains one of the most notorious serial killers in modern history.',
    draw: drawLegacyScene,
  }
];

function setSceneText(scene, t) {
  if (!scene) return;
  titleEl.textContent = scene.title;
  narrationEl.textContent = scene.text;
}

function getCurrentScene(now) {
  const current = scenes.find((scene) => now >= scene.start && now < scene.end) || scenes[scenes.length - 1];
  return current;
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function animate() {
  if (!playing) return;

  const now = (performance.now() - startTime) / 1000;
  elapsed = now;

  if (now >= totalDuration) {
    playing = false;
    toggleBtn.textContent = 'Replay';
    return;
  }

  const scene = getCurrentScene(now);
  setSceneText(scene, now);
  scene.draw(now - scene.start, scene);
  requestAnimationFrame(animate);
}

function startPlayback() {
  if (!playing) {
    playing = true;
    startTime = performance.now() - elapsed * 1000;
    toggleBtn.textContent = 'Pause';
    requestAnimationFrame(animate);
  }
}

function pausePlayback() {
  playing = false;
  toggleBtn.textContent = 'Play';
}

function restartPlayback() {
  elapsed = 0;
  startTime = performance.now();
  playing = true;
  toggleBtn.textContent = 'Pause';
  requestAnimationFrame(animate);
}

toggleBtn.addEventListener('click', () => {
  if (playing) {
    pausePlayback();
  } else {
    if (elapsed >= totalDuration) {
      elapsed = 0;
      startTime = performance.now();
    }
    startPlayback();
  }
});

restartBtn.addEventListener('click', () => {
  restartPlayback();
});

window.addEventListener('resize', () => {
  resizeCanvas();
  const scene = getCurrentScene(elapsed);
  scene.draw(elapsed - scene.start, scene);
});

function drawBackground(t, palette) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, palette.skyTop);
  grad.addColorStop(0.45, palette.skyMid);
  grad.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function drawVillageScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#12181e',
    skyMid: '#243342',
    skyBottom: '#0f1012'
  });

  const moonX = w * 0.78;
  const moonY = h * 0.20;
  ctx.fillStyle = 'rgba(220, 225, 234, 0.85)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(17, 17, 18, 0.88)';
  const houseX = w * 0.18;
  for (let i = 0; i < 6; i++) {
    const x = houseX + i * 90;
    ctx.fillRect(x, h * 0.56, 58, h * 0.22);
    ctx.beginPath();
    ctx.moveTo(x - 8, h * 0.56);
    ctx.lineTo(x + 28, h * 0.42);
    ctx.lineTo(x + 58, h * 0.56);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x + 18, h * 0.68, 12, 38);
  }

  for (let i = 0; i < 22; i++) {
    const x = i * 80 + (localT * 10 % 80);
    const trunkHeight = 54 + (i % 3) * 14;
    ctx.fillStyle = '#171c22';
    ctx.fillRect(x, h * 0.64, 5, trunkHeight);
    ctx.beginPath();
    ctx.arc(x + 2, h * 0.58, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#24313a';
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 14; i++) {
    ctx.fillRect(i * 100 + (localT * 14 % 100), h * 0.82, 50, 4);
  }
}

function drawSchoolScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#1b1a19',
    skyMid: '#31353a',
    skyBottom: '#1d2127'
  });

  ctx.fillStyle = '#212731';
  ctx.fillRect(w * 0.16, h * 0.34, w * 0.68, h * 0.42);
  ctx.fillStyle = '#2d3845';
  ctx.fillRect(w * 0.22, h * 0.4, w * 0.56, h * 0.28);

  for (let i = 0; i < 7; i++) {
    const x = w * 0.26 + i * 64;
    ctx.fillStyle = '#d8dbe0';
    ctx.fillRect(x, h * 0.5, 26, 64);
    ctx.fillStyle = '#39485d';
    ctx.fillRect(x + 7, h * 0.56, 12, 18);
  }

  // person silhouette
  const x = w * 0.62 + Math.sin(localT * 1.2) * 40;
  ctx.fillStyle = '#0d1117';
  ctx.beginPath();
  ctx.arc(x, h * 0.5, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - 18, h * 0.54, 36, 84);
  ctx.fillRect(x - 26, h * 0.6, 14, 58);
  ctx.fillRect(x + 12, h * 0.6, 14, 58);

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let i = 0; i < 18; i++) {
    ctx.fillRect(i * 70, h * 0.8, 30, 4);
  }
}

function drawCrimeMapScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#101c22',
    skyMid: '#1d2d30',
    skyBottom: '#0d1317'
  });

  ctx.fillStyle = '#111f24';
  ctx.fillRect(w * 0.16, h * 0.18, w * 0.66, h * 0.56);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2;
  const points = [
    [w * 0.26, h * 0.58],
    [w * 0.34, h * 0.49],
    [w * 0.44, h * 0.42],
    [w * 0.54, h * 0.54],
    [w * 0.62, h * 0.46],
    [w * 0.70, h * 0.38]
  ];

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();

  ctx.fillStyle = '#d45555';
  points.forEach((p, i) => {
    const pulse = 7 + Math.sin(localT * 3 + i) * 2;
    ctx.beginPath();
    ctx.arc(p[0], p[1], pulse, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#d7a35d';
  ctx.fillRect(w * 0.24, h * 0.14, 160, 26);
  ctx.fillStyle = '#e7ecf1';
  ctx.font = '600 16px sans-serif';
  ctx.fillText('Soviet routes', w * 0.27, h * 0.31);
}

function drawCityScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#0f1520',
    skyMid: '#1b2431',
    skyBottom: '#0c1218'
  });

  ctx.fillStyle = '#11161c';
  for (let i = 0; i < 10; i++) {
    const x = i * 110;
    ctx.fillRect(x + 20, h * 0.28, 80, h * 0.5);
    ctx.fillStyle = '#1a2631';
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(x + 35 + j * 18, h * 0.38 + j * 22, 8, 88);
    }
    ctx.fillStyle = '#11161c';
  }

  ctx.fillStyle = '#2c2c2c';
  const figureX = w * 0.5 + Math.sin(localT * 1.6) * 140;
  ctx.beginPath();
  ctx.arc(figureX, h * 0.44, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(figureX - 18, h * 0.48, 36, 90);
  ctx.fillRect(figureX - 34, h * 0.56, 18, 56);
  ctx.fillRect(figureX + 16, h * 0.56, 18, 56);

  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    const y = h * 0.78 + i * 6;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + Math.sin(localT + i) * 12);
    ctx.stroke();
  }
}

function drawInvestigationScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#151519',
    skyMid: '#20252e',
    skyBottom: '#0f1118'
  });

  ctx.fillStyle = '#171c24';
  ctx.fillRect(w * 0.15, h * 0.2, w * 0.7, h * 0.5);
  ctx.fillStyle = '#222b37';
  ctx.fillRect(w * 0.2, h * 0.28, w * 0.6, h * 0.2);

  ctx.fillStyle = '#d7a35d';
  ctx.fillRect(w * 0.24, h * 0.32, 160, 20);
  ctx.fillStyle = '#edf2f7';
  ctx.font = '600 16px sans-serif';
  ctx.fillText('Case file', w * 0.27, h * 0.46);

  ctx.strokeStyle = '#d8dfe9';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(w * 0.64, h * 0.56, 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.64, h * 0.56);
  ctx.lineTo(w * 0.69, h * 0.61);
  ctx.stroke();

  ctx.fillStyle = '#d45555';
  for (let i = 0; i < 5; i++) {
    const x = w * 0.26 + i * 74;
    const y = h * 0.66 + (i % 2) * 15;
    ctx.fillRect(x, y, 48, 12);
  }
}

function drawLegacyScene(localT) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  drawBackground(localT, {
    skyTop: '#0c1016',
    skyMid: '#18222e',
    skyBottom: '#10161d'
  });

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w * 0.18, h * 0.68);
  ctx.lineTo(w * 0.82, h * 0.68);
  ctx.stroke();

  const years = [1936, 1950, 1970, 1990, 1994];
  years.forEach((year, i) => {
    const x = w * 0.22 + i * 150;
    ctx.fillStyle = '#d7a35d';
    ctx.fillRect(x, h * 0.63, 5, 44);
    ctx.fillStyle = '#eaf1f6';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(year, x - 12, h * 0.58);
  });

  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  for (let i = 0; i < 20; i++) {
    ctx.fillRect(i * 60, h * 0.8, 35, 4);
  }
}

resizeCanvas();
const scene = scenes[0];
setSceneText(scene, 0);
scene.draw(0, scene);
