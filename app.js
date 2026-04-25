/* ============================================================
   FITFLOW — app.js  (Supabase Version)
   College Project | Fitness Tracker
   ============================================================ */

'use strict';

/* ============================================================
   ██  SUPABASE CONFIG  ← PASTE YOUR KEYS HERE
   Get from: supabase.com → Your Project → Settings → API
   ============================================================ */
const SUPABASE_URL = 'https://hlwgmbqndnetoqmbavnq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsd2dtYnFuZG5ldG9xbWJhdm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTA5NjcsImV4cCI6MjA5MjE2Njk2N30.yc_UABDoos3LIG9CO9mE_7zf4Htkh63mqqXyzXa2umk';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── Constants ── */
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const TYPE_ICONS = {
  /* ── Cardio ── */
  'Running':          '🏃',
  'Cycling':          '🚴',
  'Swimming':         '🏊',
  'Jump Rope':        '🪢',
  'Treadmill':        '🏃',
  'Elliptical':       '🔄',
  'Rowing':           '🚣',
  'Stair Climbing':   '🪜',
  /* ── Gym / Strength ── */
  'Weight Training':  '🏋️',
  'Chest Press':      '🏋️',
  'Deadlift':         '🏋️',
  'Squats':           '🦵',
  'Pull-Ups':         '💪',
  'Push-Ups':         '💪',
  'Shoulder Press':   '💪',
  'Bicep Curls':      '💪',
  'Leg Press':        '🦵',
  'Cable Machine':    '🔩',
  'Dumbbell Workout': '🏋️',
  'Barbell Workout':  '🏋️',
  /* ── Classes & Flexibility ── */
  'HIIT':             '⚡',
  'CrossFit':         '⚡',
  'Circuit Training': '🔁',
  'Yoga':             '🧘',
  'Pilates':          '🧘',
  'Stretching':       '🤸',
  'Zumba':            '💃',
  'Aerobics':         '🕺',
  /* ── Sports ── */
  'Basketball':       '🏀',
  'Football':         '⚽',
  'Cricket':          '🏏',
  'Badminton':        '🏸',
  'Tennis':           '🎾',
  'Table Tennis':     '🏓',
  'Volleyball':       '🏐',
  'Swimming Laps':    '🏊',
  /* ── Combat ── */
  'Boxing':           '🥊',
  'Kickboxing':       '🥊',
  'Martial Arts':     '🥋',
  'Wrestling':        '🤼',
  /* ── Other ── */
  'Rock Climbing':    '🧗',
  'Cycling (Outdoor)':'🚴',
  'Walking':          '🚶',
  'Dance':            '💃',
  'Custom':           '⭐'
};

const TYPE_COLORS = {
  /* Cardio — green */
  'Running':          ['#EAF3DE','#2D6A27'],
  'Cycling':          ['#EAF3DE','#2D6A27'],
  'Swimming':         ['#E6F0FB','#1A5FA0'],
  'Jump Rope':        ['#EAF3DE','#2D6A27'],
  'Treadmill':        ['#EAF3DE','#2D6A27'],
  'Elliptical':       ['#EAF3DE','#2D6A27'],
  'Rowing':           ['#E6F0FB','#1A5FA0'],
  'Stair Climbing':   ['#EAF3DE','#2D6A27'],
  /* Gym — teal */
  'Weight Training':  ['#E0F2EE','#0D6858'],
  'Chest Press':      ['#E0F2EE','#0D6858'],
  'Deadlift':         ['#E0F2EE','#0D6858'],
  'Squats':           ['#E0F2EE','#0D6858'],
  'Pull-Ups':         ['#E0F2EE','#0D6858'],
  'Push-Ups':         ['#E0F2EE','#0D6858'],
  'Shoulder Press':   ['#E0F2EE','#0D6858'],
  'Bicep Curls':      ['#E0F2EE','#0D6858'],
  'Leg Press':        ['#E0F2EE','#0D6858'],
  'Cable Machine':    ['#E0F2EE','#0D6858'],
  'Dumbbell Workout': ['#E0F2EE','#0D6858'],
  'Barbell Workout':  ['#E0F2EE','#0D6858'],
  /* HIIT / Classes — coral/red */
  'HIIT':             ['#FAEAE6','#C94B2E'],
  'CrossFit':         ['#FAEAE6','#C94B2E'],
  'Circuit Training': ['#FAEAE6','#C94B2E'],
  'Zumba':            ['#FAEAE6','#C94B2E'],
  'Aerobics':         ['#FAEAE6','#C94B2E'],
  /* Flexibility — purple */
  'Yoga':             ['#EEECFB','#5046B0'],
  'Pilates':          ['#EEECFB','#5046B0'],
  'Stretching':       ['#EEECFB','#5046B0'],
  /* Sports — amber */
  'Basketball':       ['#FDF3E3','#B8720E'],
  'Football':         ['#FDF3E3','#B8720E'],
  'Cricket':          ['#FDF3E3','#B8720E'],
  'Badminton':        ['#FDF3E3','#B8720E'],
  'Tennis':           ['#FDF3E3','#B8720E'],
  'Table Tennis':     ['#FDF3E3','#B8720E'],
  'Volleyball':       ['#FDF3E3','#B8720E'],
  'Swimming Laps':    ['#E6F0FB','#1A5FA0'],
  /* Combat — coral */
  'Boxing':           ['#FAEAE6','#C94B2E'],
  'Kickboxing':       ['#FAEAE6','#C94B2E'],
  'Martial Arts':     ['#FAEAE6','#C94B2E'],
  'Wrestling':        ['#FAEAE6','#C94B2E'],
  /* Other */
  'Rock Climbing':    ['#E0F2EE','#0D6858'],
  'Cycling (Outdoor)':['#EAF3DE','#2D6A27'],
  'Walking':          ['#EAF3DE','#2D6A27'],
  'Dance':            ['#EEECFB','#5046B0'],
  'Custom':           ['#F1EFE8','#5F5E5A']
};

const CAT_ICONS = {'Endurance':'🏃','Strength':'💪','Weight Loss':'⚖️','Flexibility':'🧘','Consistency':'📅','Distance':'📍'};
const CAT_BG    = {'Endurance':'#EAF3DE','Strength':'#E0F2EE','Weight Loss':'#FDF3E3','Flexibility':'#EEECFB','Consistency':'#FDF3E3','Distance':'#E6F0FB'};

/* ── App State ── */
let currentUser = null;
let allWorkouts = [];
let allPlanned  = [];
let allGoals    = [];
let selectedDay = DAYS[0];
let logSelType  = 'Running';
let planSelType = 'Running';

/* ── Field-name normalizers (Supabase column names differ from old local version) ── */
const getDur  = w => w.duration || w.dur  || 0;
const getKcal = w => w.calories || w.cals || 0;
const getDist = w => w.distance || w.dist || 0;
const getDone = p => p.is_completed ?? p.done ?? false;
const getPDay = p => p.day_of_week  || p.day  || '';
const getPDur = p => p.target_duration || p.targetDur  || 0;
const getPCal = p => p.target_calories || p.targetCals || 0;
const getGCur = g => g.current_val ?? g.current ?? 0;
const getGTgt = g => g.target_val  ?? g.target  ?? 1;

/* ============================================================
   SUPABASE DATA LAYER
   ============================================================ */
const DB = {

  /* Auth */
  signup: async (firstName, lastName, email, password, age, goal) => {
    const { data, error } = await _sb.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    await _sb.from('profiles').upsert({ id: data.user.id, first_name: firstName, last_name: lastName, age: age||null, fitness_goal: goal });
    return data.user;
  },
  login: async (email, password) => {
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data.user;
  },
  logout:      async ()       => { await _sb.auth.signOut(); },
  getSession:  async ()       => { const { data } = await _sb.auth.getSession(); return data.session; },
  getProfile:  async (uid)    => { const { data } = await _sb.from('profiles').select('*').eq('id', uid).single(); return data; },
  updateProfile: async (uid, c) => { const { error } = await _sb.from('profiles').upsert({ id: uid, ...c }); if (error) throw new Error(error.message); },
  updatePassword: async (pw)  => { const { error } = await _sb.auth.updateUser({ password: pw }); if (error) throw new Error(error.message); },

  /* Workouts */
  loadWorkouts: async (uid) => {
    const { data, error } = await _sb.from('workouts').select('*').eq('user_id', uid).order('date', { ascending: false });
    if (error) throw new Error(error.message); return data || [];
  },
  addWorkout: async (wo) => {
    const { data, error } = await _sb.from('workouts').insert(wo).select().single();
    if (error) throw new Error(error.message); return data;
  },
  deleteWorkout: async (id) => { const { error } = await _sb.from('workouts').delete().eq('id', id); if (error) throw new Error(error.message); },

  /* Planned workouts */
  loadPlanned: async (uid) => {
    const { data, error } = await _sb.from('planned_workouts').select('*').eq('user_id', uid).order('sort_order', { ascending: true });
    if (error) throw new Error(error.message); return data || [];
  },
  addPlanned: async (p) => {
    const { data, error } = await _sb.from('planned_workouts').insert(p).select().single();
    if (error) throw new Error(error.message); return data;
  },
  updatePlanned: async (id, c) => { const { error } = await _sb.from('planned_workouts').update(c).eq('id', id); if (error) throw new Error(error.message); },
  deletePlanned: async (id)    => { const { error } = await _sb.from('planned_workouts').delete().eq('id', id); if (error) throw new Error(error.message); },

  /* Goals */
  loadGoals: async (uid) => {
    const { data, error } = await _sb.from('goals').select('*').eq('user_id', uid).order('created_at', { ascending: false });
    if (error) throw new Error(error.message); return data || [];
  },
  addGoal: async (g) => {
    const { data, error } = await _sb.from('goals').insert(g).select().single();
    if (error) throw new Error(error.message); return data;
  },
  deleteGoal: async (id) => { const { error } = await _sb.from('goals').delete().eq('id', id); if (error) throw new Error(error.message); }
};

/* ============================================================
   AUTH
   ============================================================ */
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((el, i) => el.classList.toggle('active', tab === 'login' ? i === 0 : i === 1));
  document.getElementById('loginPanel').classList.toggle('active',  tab === 'login');
  document.getElementById('signupPanel').classList.toggle('active', tab === 'signup');
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  input.type  = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
}

function showAuthErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 6000);
}

function setAuthBtn(id, loading, label) {
  const btn = document.getElementById(id);
  btn.disabled  = loading;
  btn.innerHTML = loading ? '<span class="spinner"></span> Please wait…' : label;
}

async function doSignup() {
  const first = document.getElementById('suFirst').value.trim();
  const last  = document.getElementById('suLast').value.trim();
  const email = document.getElementById('suEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('suPass').value;
  const age   = parseInt(document.getElementById('suAge').value) || 0;
  const goal  = document.getElementById('suGoal').value;

  if (!first || !last)               return showAuthErr('signupErr', 'Please enter your full name.');
  if (!email || !email.includes('@')) return showAuthErr('signupErr', 'Enter a valid email address.');
  if (pass.length < 6)               return showAuthErr('signupErr', 'Password must be at least 6 characters.');

  setAuthBtn('signupBtn', true, 'Create Account →');
  try {
    const user = await DB.signup(first, last, email, pass, age, goal);
    toast('Account created! Welcome 🎉', '🎉');
    await loadApp(user);
  } catch (e) { showAuthErr('signupErr', e.message); }
  finally { setAuthBtn('signupBtn', false, 'Create Account →'); }
}

async function doLogin() {
  const email = document.getElementById('liEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('liPass').value;
  if (!email || !pass) return showAuthErr('loginErr', 'Please fill in all fields.');

  setAuthBtn('loginBtn', true, 'Sign In →');
  try {
    const user = await DB.login(email, pass);
    await loadApp(user);
  } catch (e) { showAuthErr('loginErr', e.message); }
  finally { setAuthBtn('loginBtn', false, 'Sign In →'); }
}

async function doLogout() {
  if (!confirm('Log out of FitFlow?')) return;
  await DB.logout();
  currentUser = null; allWorkouts = []; allPlanned = []; allGoals = [];
  document.getElementById('appScreen').style.display  = 'none';
  document.getElementById('authScreen').style.display = 'flex';
  document.getElementById('liEmail').value = '';
  document.getElementById('liPass').value  = '';
}

/* ============================================================
   BOOT
   ============================================================ */
async function loadApp(user) {
  document.getElementById('authScreen').style.display   = 'none';
  document.getElementById('appScreen').style.display    = 'block';
  document.getElementById('globalLoader').style.display = 'flex';

  try {
    const [profile, workouts, planned, goals] = await Promise.all([
      DB.getProfile(user.id), DB.loadWorkouts(user.id),
      DB.loadPlanned(user.id), DB.loadGoals(user.id)
    ]);

    currentUser = {
      id:        user.id,
      email:     user.email,
      firstName: profile?.first_name   || user.email.split('@')[0],
      lastName:  profile?.last_name    || '',
      age:       profile?.age          || null,
      goal:      profile?.fitness_goal || 'Weight Loss',
      joined:    profile?.created_at   || user.created_at
    };
    allWorkouts = workouts;
    allPlanned  = planned;
    allGoals    = goals;
  } catch (e) {
    console.error('Data load error:', e.message);
    toast('Error loading data: ' + e.message, '❌');
  }

  document.getElementById('globalLoader').style.display = 'none';
  loadSplitData();
  updateSidebar(); updateTopbar(); buildTypePickers(); buildDayList(); renderDashboard();
  updateMobileHeader();
  const todayISO = new Date().toISOString().split('T')[0];
  document.getElementById('wDate').value = todayISO;
  document.getElementById('gDead').min   = todayISO;
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function updateTopbar() {
  const nm = currentUser.firstName || currentUser.email.split('@')[0];
  const h  = new Date().getHours();
  const gr = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('topGreet').textContent = `${gr}, ${nm}! 👋`;
  document.getElementById('topDate').textContent  =
    new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const now = new Date();
  const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
  const el  = document.getElementById('wkRange');
  if (el) el.textContent = mon.toLocaleDateString('en-IN',{day:'numeric',month:'short'}) + ' – ' + sun.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
}

function updateSidebar() {
  const f   = currentUser.firstName || '';
  const l   = currentUser.lastName  || '';
  const ava = (f[0] || currentUser.email[0] || '?').toUpperCase() + (l[0] || '').toUpperCase();
  document.getElementById('sideAva').textContent = ava;
  document.getElementById('sideNm').textContent  = (f + ' ' + l).trim() || currentUser.email.split('@')[0];
  document.getElementById('sideEm').textContent  = currentUser.email;
  if (typeof updateMobileHeader === 'function') updateMobileHeader();
}


/* Category groups for the type picker */
const TYPE_GROUPS = {
  '🏃 Cardio':     ['Running','Cycling','Swimming','Jump Rope','Treadmill','Elliptical','Rowing','Stair Climbing','Walking'],
  '🏋️ Gym / Strength': ['Weight Training','Chest Press','Deadlift','Squats','Pull-Ups','Push-Ups','Shoulder Press','Bicep Curls','Leg Press','Cable Machine','Dumbbell Workout','Barbell Workout'],
  '⚡ HIIT & Classes': ['HIIT','CrossFit','Circuit Training','Zumba','Aerobics'],
  '🧘 Flexibility': ['Yoga','Pilates','Stretching'],
  '🏅 Sports':     ['Basketball','Football','Cricket','Badminton','Tennis','Table Tennis','Volleyball','Swimming Laps'],
  '🥊 Combat':     ['Boxing','Kickboxing','Martial Arts','Wrestling'],
  '⭐ Other':       ['Rock Climbing','Cycling (Outdoor)','Dance','Custom']
};

function buildTypePickers() {
  ['logTypePicker','planTypePicker'].forEach(pickerId => {
    const iLog = pickerId === 'logTypePicker';
    const fn   = iLog ? 'pickLogType' : 'pickPlanType';
    const sel  = iLog ? logSelType : planSelType;

    let html = `<div style="margin-bottom:8px;">
      <input type="text" placeholder="🔍 Search workout type…"
        oninput="filterTypePicker(this,'${pickerId}','${fn}')"
        style="width:100%;padding:9px 13px;border:1.5px solid var(--border2);border-radius:11px;font-size:13px;font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);outline:none;margin-bottom:10px;"
      />
    </div>
    <div id="${pickerId}-inner">`;

    for (const [group, types] of Object.entries(TYPE_GROUPS)) {
      html += `<div style="margin-bottom:10px;">
        <div style="font-size:11px;font-weight:500;color:var(--text3);letter-spacing:.8px;text-transform:uppercase;margin-bottom:6px;">${group}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;">`;
      types.forEach(t => {
        html += `<div class="type-btn${t === sel ? ' sel' : ''}" data-type="${t}" onclick="${fn}(this,'${t}')">
          <div class="type-btn-ico">${TYPE_ICONS[t] || '⭐'}</div>
          <div class="type-btn-nm" style="font-size:10px;line-height:1.3;">${t}</div>
        </div>`;
      });
      html += `</div></div>`;
    }
    html += '</div>';
    document.getElementById(pickerId).innerHTML = html;
  });
}

function filterTypePicker(input, pickerId, fn) {
  const q    = input.value.toLowerCase().trim();
  const sel  = pickerId === 'logTypePicker' ? logSelType : planSelType;
  const inner = document.getElementById(pickerId + '-inner');
  if (!q) { buildTypePickers(); return; }

  const matches = Object.values(TYPE_GROUPS).flat().filter(t => t.toLowerCase().includes(q));
  inner.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;">` +
    matches.map(t => `<div class="type-btn${t === sel ? ' sel' : ''}" data-type="${t}" onclick="${fn}(this,'${t}')">
      <div class="type-btn-ico">${TYPE_ICONS[t] || '⭐'}</div>
      <div class="type-btn-nm" style="font-size:10px;line-height:1.3;">${t}</div>
    </div>`).join('') +
    (matches.length === 0 ? `<div style="grid-column:1/-1;text-align:center;padding:16px;color:var(--text3);font-size:13px;">No workout type found</div>` : '') +
    '</div>';
}

function pickLogType(btn, type) {
  document.querySelectorAll('#logTypePicker .type-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel'); logSelType = type;
}
function pickPlanType(btn, type) {
  document.querySelectorAll('#planTypePicker .type-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel'); planSelType = type;
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  renderStats(); renderWeekChart(); renderDashGoals(); renderTodayPlan(); renderRecentWo();
}

function renderStats() {
  const now  = new Date();
  const wsMs = new Date(now); wsMs.setDate(now.getDate() - ((now.getDay() + 6) % 7)); wsMs.setHours(0,0,0,0);
  const ww   = allWorkouts.filter(w => new Date((w.date||'') + 'T12:00:00') >= wsMs);
  const cards = [
    { lbl:'Workouts', val: ww.length,                              note:'this week',     delta:'↑ on track',    col:'#2D6A27', bg:'#EAF3DE', ico:'💪', bar:'#4A9C3F' },
    { lbl:'Calories', val: ww.reduce((a,w)=>a+getKcal(w),0).toLocaleString(), note:'kcal this week', delta:'↑ great effort', col:'#0D6858', bg:'#E0F2EE', ico:'🔥', bar:'#0D6858' },
    { lbl:'Minutes',  val: ww.reduce((a,w)=>a+getDur(w),0),        note:'min this week',  delta:'↑ improving',   col:'#B8720E', bg:'#FDF3E3', ico:'⏱', bar:'#B8720E' },
    { lbl:'Streak',   val: calcStreak(),                            note:'days in a row',  delta:'keep going!',   col:'#5046B0', bg:'#EEECFB', ico:'⚡', bar:'#5046B0' }
  ];
  document.getElementById('statsGrid').innerHTML = cards.map(c =>
    `<div class="stat-card">
       <div class="stat-bar" style="background:${c.bar}"></div>
       <div class="stat-icon" style="background:${c.bg}">${c.ico}</div>
       <div class="stat-lbl">${c.lbl}</div>
       <div class="stat-num" style="color:${c.col}">${c.val}</div>
       <div class="stat-note">${c.note}</div>
       <div class="stat-delta delta-up">${c.delta}</div>
     </div>`).join('');
}

function renderWeekChart() {
  const now      = new Date();
  const todayIdx = (now.getDay() + 6) % 7;
  const wsMs     = new Date(now); wsMs.setDate(now.getDate() - todayIdx); wsMs.setHours(0,0,0,0);
  const data     = Array(7).fill(0);
  allWorkouts.forEach(w => {
    const d    = new Date((w.date||'') + 'T12:00:00');
    const diff = Math.round((d - wsMs) / 86400000);
    if (diff >= 0 && diff < 7) data[diff] += getDur(w);
  });
  const maxVal = Math.max(...data, 30);
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  document.getElementById('weekChart').innerHTML = labels.map((d, i) => {
    const h       = Math.max(3, Math.round((data[i] / maxVal) * 105));
    const isToday = i === todayIdx;
    const col     = isToday ? '#2D6A27' : data[i] > 0 ? '#4A9C3F' : '#E4E0D8';
    const outline = isToday ? 'outline:2px solid #2D6A27;outline-offset:2px;' : '';
    return `<div class="bar-col">
      <div class="bar-val">${data[i] > 0 ? data[i] + 'm' : ''}</div>
      <div class="bar-fill" style="height:${h}px;background:${col};${outline}" title="${d}: ${data[i]}min"></div>
      <div class="bar-day ${isToday ? 'today-lbl' : ''}">${d}</div>
    </div>`;
  }).join('');
}

function renderDashGoals() {
  const colors = ['#4A9C3F','#0D6858','#B8720E','#5046B0'];
  const goals  = allGoals.slice(0, 4);
  const el     = document.getElementById('dashGoals');
  if (!goals.length) {
    el.innerHTML = `<div class="empty-st" style="padding:16px 0"><div class="empty-ico">🎯</div><div class="empty-sub">No goals yet. <span class="link-btn" onclick="goTo('goals',document.querySelectorAll('.nav-btn')[3])">Set one →</span></div></div>`;
    return;
  }
  el.innerHTML = goals.map((g, i) => {
    const pct = Math.min(100, Math.round((getGCur(g) / getGTgt(g)) * 100));
    return `<div class="goal-row">
      <div class="goal-row-hdr"><span class="goal-row-nm">${g.name}</span><span class="goal-row-pct" style="color:${colors[i]}">${pct}%</span></div>
      <div class="prog-track"><div class="prog-bar" style="width:${pct}%;background:${colors[i]}"></div></div>
      <div class="prog-meta">${getGCur(g)} / ${getGTgt(g)} ${g.unit||''} · Due ${fmtDate(g.deadline)}</div>
    </div>`;
  }).join('');
}

function renderTodayPlan() {
  if (typeof renderTodaySplitDash === 'function') renderTodaySplitDash();
}

function renderRecentWo() {
  const list = allWorkouts.slice(0, 4);
  const el   = document.getElementById('recentWo');
  if (!list.length) { el.innerHTML = `<div class="empty-st"><div class="empty-ico">🏃</div><div class="empty-sub">No workouts logged yet.</div></div>`; return; }
  el.innerHTML = list.map(w => {
    const [bg, fg] = TYPE_COLORS[w.type] || ['#EDE9E2','#5A5750'];
    return `<div class="wo-item">
      <div class="wo-ico" style="background:${bg}">${TYPE_ICONS[w.type]||'🏃'}</div>
      <div class="wo-info">
        <div class="wo-name">${w.name}</div>
        <div class="wo-meta"><span>⏱ ${getDur(w)}min</span>${getDist(w)>0?`<span>📍 ${getDist(w)}km</span>`:''}<span>${fmtDate(w.date)}</span></div>
      </div>
      <div class="wo-kcal" style="background:${bg};color:${fg}">${getKcal(w)} kcal</div>
    </div>`;
  }).join('');
}

function calcStreak() {
  if (!allWorkouts.length) return 0;
  const dates = [...new Set(allWorkouts.map(w => w.date))].sort().reverse();
  let streak  = 0;
  let check   = new Date(); check.setHours(12, 0, 0, 0);
  for (const d of dates) {
    const wd   = new Date(d + 'T12:00:00');
    if (Math.round((check - wd) / 86400000) <= 1) { streak++; check = wd; }
    else break;
  }
  return streak;
}

/* ============================================================
   WORKOUT PLANNER
   ============================================================ */
function buildDayList() {
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  if (!selectedDay) selectedDay = todayName;
  document.getElementById('dayList').innerHTML = DAYS.map(day => {
    const count    = allPlanned.filter(p => getPDay(p) === day).length;
    const isToday  = day === todayName;
    const isActive = day === selectedDay;
    return `<div class="day-pill ${isActive ? 'active-day' : ''} ${count > 0 ? 'has-plan' : ''}" onclick="selectDay('${day}')">
      <div class="day-pill-left">
        <div class="day-pill-name">${day} ${isToday ? '<span class="day-today-badge">Today</span>' : ''}</div>
        <div class="day-pill-count">${count ? count + ' workout' + (count > 1 ? 's' : '') : 'Rest day'}</div>
      </div>
      <div class="day-dot"></div>
    </div>`;
  }).join('');
  buildMobileDayList();
}

function selectDay(day) { selectedDay = day; buildDayList(); renderPlannerDay(); }

function renderPlannerDay() {
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  document.getElementById('plannerDayTitle').textContent = selectedDay;
  document.getElementById('plannerDayDate').textContent  = selectedDay === todayName ? '📅 Today' : getDayDate(selectedDay);
  document.getElementById('addFormDayLabel').textContent = selectedDay;
  const dayPlan = allPlanned.filter(p => getPDay(p) === selectedDay);
  const el      = document.getElementById('plannedList');
  if (!dayPlan.length) {
    el.innerHTML = `<div class="planned-empty">No workouts planned for <strong>${selectedDay}</strong>. Click <strong>"+ Add Workout"</strong> to add one!</div>`;
  } else {
    el.innerHTML = dayPlan.map(p => {
      const done     = getDone(p);
      const [bg, fg] = TYPE_COLORS[p.type] || ['#EDE9E2','#5A5750'];
      return `<div class="planned-item ${done ? 'completed' : ''}" id="pi-${p.id}">
        <div class="planned-ico" style="background:${bg}">${TYPE_ICONS[p.type]||'🏃'}</div>
        <div class="planned-info">
          <div class="planned-nm">${p.name}</div>
          <div class="planned-meta">${getPDur(p)?`<span>⏱ ${getPDur(p)}min</span>`:''}${getPCal(p)?`<span>🔥 ${getPCal(p)}kcal</span>`:''}${p.intensity?`<span>${p.intensity}</span>`:''}${p.notes?`<span style="font-style:italic">${p.notes}</span>`:''}</div>
        </div>
        <div class="planned-acts">
          <button class="ico-btn done-btn" onclick="togglePlannedDone('${p.id}',${done})" title="${done?'Mark undone':'Mark done'}">${done ? '↩' : '✓'}</button>
          <button class="ico-btn del-btn"  onclick="deletePlanned('${p.id}')" title="Remove">🗑</button>
        </div>
      </div>`;
    }).join('');
  }
  renderPlanSummary();
}

function toggleAddForm() {
  const f = document.getElementById('addPlanForm');
  f.classList.toggle('hidden');
  if (!f.classList.contains('hidden')) document.getElementById('pfName').focus();
}

async function savePlannedWorkout() {
  const name       = document.getElementById('pfName').value.trim() || planSelType + ' Session';
  const targetDur  = parseInt(document.getElementById('pfDur').value)  || 0;
  const targetCals = parseInt(document.getElementById('pfCals').value) || 0;
  const intensity  = document.getElementById('pfIntensity').value;
  const notes      = document.getElementById('pfNotes').value.trim();
  const sortOrder  = allPlanned.filter(p => getPDay(p) === selectedDay).length;
  try {
    const saved = await DB.addPlanned({ user_id: currentUser.id, day_of_week: selectedDay, type: planSelType, name, target_duration: targetDur, target_calories: targetCals, intensity, notes, is_completed: false, sort_order: sortOrder });
    allPlanned.push(saved);
    ['pfName','pfDur','pfCals','pfNotes'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('pfIntensity').value = 'Moderate';
    document.getElementById('addPlanForm').classList.add('hidden');
    buildDayList(); renderPlannerDay(); renderTodayPlan();
    toast(`Workout saved to ${selectedDay}! 💾`, '✓');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

async function togglePlannedDone(id, currentDone) {
  const newDone = !currentDone;
  try {
    await DB.updatePlanned(id, { is_completed: newDone });
    const item = allPlanned.find(p => p.id === id);
    if (item) { item.is_completed = newDone; item.done = newDone; }
    renderPlannerDay(); renderTodayPlan();
    toast(newDone ? 'Marked as done! 🎉' : 'Marked as undone', newDone ? '✓' : '↩');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

async function markAllDone() {
  const pending = allPlanned.filter(p => getPDay(p) === selectedDay && !getDone(p));
  if (!pending.length) return toast('All already done!', '✓');
  try {
    await Promise.all(pending.map(p => DB.updatePlanned(p.id, { is_completed: true })));
    pending.forEach(p => { p.is_completed = true; p.done = true; });
    renderPlannerDay(); renderTodayPlan();
    toast(`All ${selectedDay} workouts done! 🎉`, '✓');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

async function deletePlanned(id) {
  if (!confirm('Remove this planned workout?')) return;
  try {
    await DB.deletePlanned(id);
    allPlanned = allPlanned.filter(p => p.id !== id);
    buildDayList(); renderPlannerDay(); renderTodayPlan();
    toast('Removed from plan', '🗑');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

function renderPlanSummary() {
  const summary = DAYS.map(day => {
    const dp = allPlanned.filter(p => getPDay(p) === day);
    return { day, done: dp.filter(p => getDone(p)).length, total: dp.length, mins: dp.reduce((a,p)=>a+getPDur(p),0), cals: dp.reduce((a,p)=>a+getPCal(p),0) };
  });
  const statsHTML = [
    { lbl:'Planned',   val: summary.reduce((a,s)=>a+s.total,0), col:'#2D6A27' },
    { lbl:'Completed', val: summary.reduce((a,s)=>a+s.done,0),  col:'#0D6858' },
    { lbl:'Est. Mins', val: summary.reduce((a,s)=>a+s.mins,0),  col:'#B8720E' },
    { lbl:'Est. Cals', val: summary.reduce((a,s)=>a+s.cals,0),  col:'#5046B0' }
  ].map(s => `<div class="psstat"><div class="psstat-num" style="color:${s.col}">${s.val}</div><div class="psstat-lbl">${s.lbl}</div></div>`).join('');
  const daysHTML = summary.filter(s => s.total > 0).map(s => {
    const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
    return `<div class="plan-day-row"><div class="plan-day-nm">${s.day.slice(0,3)}</div><div class="plan-day-bar"><div class="plan-day-fill" style="width:${pct}%"></div></div><div class="plan-day-ct">${s.done}/${s.total} done</div></div>`;
  }).join('') || '<div style="text-align:center;color:#96938C;font-size:13px;padding:12px">No workouts planned yet</div>';
  document.getElementById('planSummary').innerHTML = `<div class="plan-summary-stats">${statsHTML}</div>${daysHTML}`;
}

function getDayDate(dayName) {
  const today = new Date();
  const target = new Date(today);
  target.setDate(today.getDate() + (DAYS.indexOf(dayName) - ((today.getDay() + 6) % 7)));
  return target.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
}

/* ============================================================
   LOG WORKOUT
   ============================================================ */
async function saveWorkout() {
  const name      = document.getElementById('wName').value.trim() || logSelType + ' Session';
  const date      = document.getElementById('wDate').value || new Date().toISOString().split('T')[0];
  const duration  = parseInt(document.getElementById('wDur').value)    || 0;
  const calories  = parseInt(document.getElementById('wCals').value)   || 0;
  const distance  = parseFloat(document.getElementById('wDist').value) || 0;
  const intensity = document.getElementById('wIntensity').value;
  const notes     = document.getElementById('wNotes').value.trim();
  if (!duration || !calories) return toast('Please enter duration and calories', '⚠');
  try {
    const saved = await DB.addWorkout({ user_id: currentUser.id, name, date, type: logSelType, duration, calories, distance, intensity, notes });
    allWorkouts.unshift(saved);
    clearLog();
    toast('Workout saved! 🎉', '✓');
    setTimeout(() => goTo('dashboard', document.querySelectorAll('.nav-btn')[0]), 700);
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

function clearLog() {
  ['wName','wDur','wCals','wDist','wNotes'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('wIntensity').value = 'Moderate';
}

/* ============================================================
   HISTORY
   ============================================================ */
function renderHistory(data) {
  const body  = document.getElementById('histBody');
  const empty = document.getElementById('histEmpty');
  if (!data.length) { body.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  body.innerHTML = data.map(w => {
    const [bg, fg] = TYPE_COLORS[w.type] || ['#EDE9E2','#5A5750'];
    return `<tr>
      <td style="color:#96938C;white-space:nowrap">${fmtDate(w.date)}</td>
      <td><strong>${w.name}</strong></td>
      <td><span class="badge" style="background:${bg};color:${fg}">${w.type}</span></td>
      <td>${getDur(w)} min</td>
      <td style="font-weight:600;color:#C94B2E">${getKcal(w)} kcal</td>
      <td>${getDist(w) > 0 ? getDist(w) + ' km' : '—'}</td>
      <td style="color:#96938C">${w.intensity||'—'}</td>
      <td style="color:#96938C;font-size:12px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${w.notes||'—'}</td>
      <td><button class="del-btn-sm" onclick="deleteWorkout('${w.id}')">🗑</button></td>
    </tr>`;
  }).join('');
}

function filterHist() {
  const q    = document.getElementById('hSearch').value.toLowerCase();
  const type = document.getElementById('hFilter').value;
  renderHistory(allWorkouts.filter(w => (!q || w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q)) && (!type || w.type === type)));
}

async function deleteWorkout(id) {
  if (!confirm('Delete this workout?')) return;
  try {
    await DB.deleteWorkout(id);
    allWorkouts = allWorkouts.filter(w => w.id !== id);
    filterHist();
    toast('Workout deleted', '🗑');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

/* ============================================================
   GOALS
   ============================================================ */
function renderGoals() {
  const colors = ['#4A9C3F','#0D6858','#B8720E','#5046B0','#1A5FA0','#C94B2E'];
  const el     = document.getElementById('goalsGrid');
  if (!allGoals.length) {
    el.innerHTML = `<div style="grid-column:1/-1"><div class="empty-st"><div class="empty-ico">🎯</div><div class="empty-title">No goals set</div><div class="empty-sub">Click "+ New Goal" to start tracking.</div></div></div>`;
    return;
  }
  el.innerHTML = allGoals.map((g, i) => {
    const pct    = Math.min(100, Math.round((getGCur(g) / getGTgt(g)) * 100));
    const status = pct >= 100 ? ['s-done','Completed'] : pct >= 80 ? ['s-almost','Almost There'] : pct < 40 ? ['s-behind','Behind'] : ['s-on','On Track'];
    const col    = colors[i % colors.length];
    return `<div class="goal-card">
      <div class="gc-top">
        <div class="gc-icon" style="background:${CAT_BG[g.category]||'#EDE9E2'}">${CAT_ICONS[g.category]||'🎯'}</div>
        <span class="gc-status ${status[0]}">${status[1]}</span>
      </div>
      <div class="gc-name">${g.name}</div>
      <div class="gc-type">${g.category} · Due ${fmtDate(g.deadline)}</div>
      <div class="gc-nums">
        <span class="gc-cur" style="color:${col}">${getGCur(g)} <span class="gc-unit">${g.unit||''}</span></span>
        <span class="gc-tar">Target: ${getGTgt(g)} ${g.unit||''}</span>
      </div>
      <div class="prog-track" style="height:8px;"><div class="prog-bar" style="width:${pct}%;background:${col}"></div></div>
      <div class="gc-foot"><span class="gc-pct-txt">${pct}% complete</span><button class="del-btn-sm" onclick="deleteGoal('${g.id}')">✕ Remove</button></div>
    </div>`;
  }).join('');
}

async function saveGoal() {
  const name     = document.getElementById('gName').value.trim();
  const category = document.getElementById('gCat').value;
  const unit     = document.getElementById('gUnit').value.trim() || 'units';
  const curVal   = parseFloat(document.getElementById('gCur').value) || 0;
  const tgtVal   = parseFloat(document.getElementById('gTgt').value);
  const deadline = document.getElementById('gDead').value;
  if (!name || !tgtVal || !deadline) return toast('Fill all required fields', '⚠');
  try {
    const saved = await DB.addGoal({ user_id: currentUser.id, name, category, unit, current_val: curVal, target_val: tgtVal, deadline });
    allGoals.unshift(saved);
    renderGoals(); renderDashGoals();
    document.getElementById('goalModal').classList.remove('open');
    ['gName','gUnit','gCur','gTgt','gDead'].forEach(id => document.getElementById(id).value = '');
    toast('Goal saved! 🎯', '✓');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

async function deleteGoal(id) {
  if (!confirm('Remove this goal?')) return;
  try {
    await DB.deleteGoal(id);
    allGoals = allGoals.filter(g => g.id !== id);
    renderGoals(); renderDashGoals();
    toast('Goal removed', '🗑');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

/* ============================================================
   PROGRESS
   ============================================================ */
function renderProgress() { renderRings(); renderMonthChart(); renderPRs(); renderTypeBreak(); }

function renderRings() {
  const now  = new Date();
  const wsMs = new Date(now); wsMs.setDate(now.getDate() - ((now.getDay() + 6) % 7)); wsMs.setHours(0,0,0,0);
  const ww   = allWorkouts.filter(w => new Date((w.date||'') + 'T12:00:00') >= wsMs);
  const dist = allWorkouts.slice(0, 10).reduce((a,w) => a + getDist(w), 0);
  const rings = [
    { name:'Weekly Sessions', val: ww.length,                          tgt:6,    unit:'/ 6 sessions', col:'#2D6A27', bg:'#EAF3DE' },
    { name:'Calories Burned',  val: ww.reduce((a,w)=>a+getKcal(w),0), tgt:3200, unit:'kcal',          col:'#0D6858', bg:'#E0F2EE' },
    { name:'Recent Distance',  val: dist.toFixed(1),                   tgt:40,   unit:'km',            col:'#B8720E', bg:'#FDF3E3' }
  ];
  document.getElementById('ringGrid').innerHTML = rings.map(r => {
    const pct    = Math.min(1, parseFloat(r.val) / r.tgt);
    const circ   = 2 * Math.PI * 40;
    const offset = circ * (1 - pct);
    return `<div class="ring-card">
      <div class="ring-wrap">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="40" fill="none" stroke="${r.bg}" stroke-width="9"/>
          <circle cx="45" cy="45" r="40" fill="none" stroke="${r.col}" stroke-width="9"
            stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}" stroke-linecap="round"/>
        </svg>
        <div class="ring-ctr"><span class="ring-num" style="color:${r.col}">${Math.round(pct * 100)}%</span><span class="ring-unit">of goal</span></div>
      </div>
      <div class="ring-name">${r.name}</div>
      <div class="ring-sub">${r.val} ${r.unit}</div>
    </div>`;
  }).join('');
}

function renderMonthChart() {
  const now    = new Date();
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1); return { lbl: d.toLocaleDateString('en-IN',{month:'short'}), yr: d.getFullYear(), mo: d.getMonth() }; });
  const data   = months.map(m => allWorkouts.filter(w => { const d = new Date((w.date||'') + 'T12:00:00'); return d.getMonth() === m.mo && d.getFullYear() === m.yr; }).reduce((a,w)=>a+getDur(w),0));
  const max    = Math.max(...data, 30);
  document.getElementById('monthChart').innerHTML = months.map((m, i) => {
    const h      = Math.max(3, Math.round((data[i] / max) * 125));
    const isLast = i === months.length - 1;
    return `<div class="bar-col"><div class="bar-val">${data[i]||''}</div><div class="bar-fill" style="height:${h}px;background:${isLast?'#2D6A27':'#4A9C3F'};opacity:${isLast?1:0.6}"></div><div class="bar-day" style="color:${isLast?'#2D6A27':'#96938C'};font-weight:${isLast?600:400}">${m.lbl}</div></div>`;
  }).join('');
}

function renderPRs() {
  const runs = allWorkouts.filter(w => w.type === 'Running');
  const prs  = [
    { lbl:'Longest Run',              val: runs.length ? Math.max(...runs.map(w=>getDist(w))).toFixed(1) + ' km' : '—' },
    { lbl:'Most Active Session',      val: allWorkouts.length ? Math.max(...allWorkouts.map(w=>getDur(w)))  + ' min'  : '—' },
    { lbl:'Max Calories (1 session)', val: allWorkouts.length ? Math.max(...allWorkouts.map(w=>getKcal(w))) + ' kcal' : '—' },
    { lbl:'Total Workouts Logged',    val: allWorkouts.length }
  ];
  document.getElementById('prList').innerHTML = prs.map(p => `<div class="pr-item"><div class="pr-label">${p.lbl}</div><div class="pr-val">${p.val}</div></div>`).join('');
}

function renderTypeBreak() {
  const counts = {};
  allWorkouts.forEach(w => { counts[w.type] = (counts[w.type] || 0) + 1; });
  const total  = allWorkouts.length || 1;
  const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  document.getElementById('typeBreak').innerHTML = sorted.length
    ? sorted.map(([type, count]) => {
        const [, fg] = TYPE_COLORS[type] || ['#EDE9E2','#5A5750'];
        const pct    = Math.round((count / total) * 100);
        return `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;"><span style="font-size:13px;font-weight:500">${TYPE_ICONS[type]||'🏃'} ${type}</span><span style="font-size:12px;color:#96938C">${count} sessions · ${pct}%</span></div><div class="prog-track"><div class="prog-bar" style="width:${pct}%;background:${fg}"></div></div></div>`;
      }).join('')
    : '<div style="text-align:center;padding:20px;color:#96938C">No workouts yet</div>';
}

function calcBMI() {
  const w = parseFloat(document.getElementById('bsW').value);
  const h = parseFloat(document.getElementById('bsH').value) / 100;
  if (!w || !h) return toast('Enter weight and height first', '⚠');
  const bmi = (w / (h * h)).toFixed(1);
  const [cat, col] = bmi < 18.5 ? ['Underweight','#1A5FA0'] : bmi < 25 ? ['Normal weight','#2D6A27'] : bmi < 30 ? ['Overweight','#B8720E'] : ['Obese','#C94B2E'];
  document.getElementById('bmiNum').textContent      = bmi;
  document.getElementById('bmiNum').style.color      = col;
  document.getElementById('bmiCat').textContent      = cat;
  document.getElementById('bmiResult').style.display = 'block';
}

/* ============================================================
   PROFILE
   ============================================================ */
function renderProfile() {
  if (!currentUser) return;
  const f   = currentUser.firstName || '';
  const l   = currentUser.lastName  || '';
  const ava = (f[0] || '?').toUpperCase() + (l[0] || '').toUpperCase();
  document.getElementById('profAva').textContent       = ava;
  document.getElementById('profName').textContent      = (f + ' ' + l).trim() || currentUser.email;
  document.getElementById('profEmail').textContent     = currentUser.email;
  document.getElementById('profGoalBadge').textContent = currentUser.goal || '—';
  document.getElementById('profAgeBadge').textContent  = 'Age ' + (currentUser.age || '—');
  document.getElementById('pfFirst').value = f;
  document.getElementById('pfLast').value  = l;
  document.getElementById('pfAge').value   = currentUser.age || '';
  document.getElementById('pfGoal').value  = currentUser.goal || 'Weight Loss';
  document.getElementById('acctStats').innerHTML = [
    { lbl:'Member Since',     val: fmtDate(currentUser.joined),                                         col:'#96938C' },
    { lbl:'Total Workouts',   val: allWorkouts.length,                                                   col:'#2D6A27' },
    { lbl:'Total Calories',   val: allWorkouts.reduce((a,w)=>a+getKcal(w),0).toLocaleString()+' kcal',  col:'#C94B2E' },
    { lbl:'Goals Set',        val: allGoals.length,                                                      col:'#5046B0' },
    { lbl:'Planned Workouts', val: allPlanned.length,                                                    col:'#0D6858' }
  ].map(s => `<div class="pr-item"><div class="pr-label">${s.lbl}</div><div class="pr-val" style="color:${s.col}">${s.val}</div></div>`).join('');
}

async function saveProfile() {
  const first = document.getElementById('pfFirst').value.trim();
  const last  = document.getElementById('pfLast').value.trim();
  const age   = parseInt(document.getElementById('pfAge').value) || null;
  const goal  = document.getElementById('pfGoal').value;
  if (!first || !last) return toast('Name cannot be empty', '⚠');
  try {
    await DB.updateProfile(currentUser.id, { first_name: first, last_name: last, age, fitness_goal: goal });
    currentUser.firstName = first; currentUser.lastName = last; currentUser.age = age; currentUser.goal = goal;
    updateSidebar(); updateTopbar(); renderProfile();
    toast('Profile updated ✓', '✓');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

async function changePass() {
  const pw   = document.getElementById('pwNew').value;
  const conf = document.getElementById('pwConfirm').value;
  if (pw.length < 6) return toast('Password must be 6+ characters', '⚠');
  if (pw !== conf)   return toast('Passwords do not match', '⚠');
  try {
    await DB.updatePassword(pw);
    document.getElementById('pwNew').value = '';
    document.getElementById('pwConfirm').value = '';
    toast('Password changed ✓', '🔒');
  } catch (e) { toast('Error: ' + e.message, '❌'); }
}

/* ============================================================
   HELPERS
   ============================================================ */
function fmtDate(str) {
  if (!str) return '—';
  const d = new Date(str.includes('T') ? str : str + 'T12:00:00');
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

function toast(msg, ico = '✓') {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  document.getElementById('toastIco').textContent = ico;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ============================================================
   ██  SPLIT PROGRAM — 4-Day Rotating Split
   Day 1: Chest & Shoulders
   Day 2: Back & Rear Delt
   Day 3: Arms
   Day 4: Legs
   After Day 4 → cycles back to Day 1
   ============================================================ */

/* Default split template — loaded for every new user */
const DEFAULT_SPLIT = [
  {
    day: 1,
    name: 'Chest & Shoulders',
    icon: '💪',
    color: '#E0F2EE',
    textColor: '#0D6858',
    muscles: ['Chest','Front Delt','Side Delt','Triceps'],
    exercises: [
      { id:'d1e1', name:'Incline Dumbbell Press',  sets:4, reps:'8-12', weight:'', rest:90, notes:'Keep chest up, elbows at 45°' },
      { id:'d1e2', name:'Flyes',                   sets:3, reps:'12-15',weight:'', rest:75, notes:'Wide arc, feel the stretch' },
      { id:'d1e3', name:'Dips',                    sets:3, reps:'8-12', weight:'', rest:90, notes:'Lean forward for chest, upright for triceps' },
      { id:'d1e4', name:'Shoulder Press',           sets:4, reps:'8-12', weight:'', rest:90, notes:'Press overhead, do not lock elbows' },
      { id:'d1e5', name:'Lateral Raise',            sets:4, reps:'15-20',weight:'', rest:60, notes:'Lead with elbows, slight bend, slow negative' }
    ]
  },
  {
    day: 2,
    name: 'Back & Rear Delt',
    icon: '🏋️',
    color: '#EAF3DE',
    textColor: '#2D6A27',
    muscles: ['Lats','Upper Back','Rear Delt','Traps','Biceps'],
    exercises: [
      { id:'d2e1', name:'Pull-Ups / Assisted Pull-Ups', sets:4, reps:'6-10', weight:'', rest:120, notes:'Full hang, chest to bar' },
      { id:'d2e2', name:'Barbell Rows',                 sets:4, reps:'8-10', weight:'', rest:90,  notes:'Hinge at hips, bar to belly button' },
      { id:'d2e3', name:'Seated Cable Row',             sets:3, reps:'10-12',weight:'', rest:75,  notes:'Elbows close, squeeze at top' },
      { id:'d2e4', name:'Cable Pullover',               sets:3, reps:'12-15',weight:'', rest:60,  notes:'Keep arms straight, feel lats stretch' },
      { id:'d2e5', name:'Rear Delt Flyes',              sets:4, reps:'15-20',weight:'', rest:60,  notes:'Bent over, lead with elbows' },
      { id:'d2e6', name:'Shrugs',                       sets:3, reps:'15-20',weight:'', rest:60,  notes:'Hold at top for 2 seconds' }
    ]
  },
  {
    day: 3,
    name: 'Arms',
    icon: '💪',
    color: '#EEECFB',
    textColor: '#5046B0',
    muscles: ['Biceps','Triceps','Forearms'],
    exercises: [
      { id:'d3e1', name:'Preacher Curls',          sets:4, reps:'10-12',weight:'', rest:75, notes:'Full ROM, no swinging' },
      { id:'d3e2', name:'Skull Crushers',           sets:4, reps:'10-12',weight:'', rest:75, notes:'Bar to forehead, elbows fixed' },
      { id:'d3e3', name:'Bayesian Cable Curls',     sets:3, reps:'12-15',weight:'', rest:60, notes:'Behind body, peak contraction' },
      { id:'d3e4', name:'Cable Overhead Pushdown',  sets:3, reps:'12-15',weight:'', rest:60, notes:'Long head stretch, arms overhead' },
      { id:'d3e5', name:'Hammer Curls',             sets:3, reps:'12-15',weight:'', rest:60, notes:'Neutral grip, hit brachialis' },
      { id:'d3e6', name:'Rope Pushdown',            sets:3, reps:'15-20',weight:'', rest:60, notes:'Spread rope at bottom, squeeze triceps' }
    ]
  },
  {
    day: 4,
    name: 'Legs',
    icon: '🦵',
    color: '#FDF3E3',
    textColor: '#B8720E',
    muscles: ['Quads','Hamstrings','Glutes','Calves'],
    exercises: [
      { id:'d4e1', name:'Squats',          sets:4, reps:'8-12', weight:'', rest:120, notes:'Knees over toes, depth below parallel' },
      { id:'d4e2', name:'Leg Extension',   sets:4, reps:'12-15',weight:'', rest:60,  notes:'Isolate quads, hold at top' },
      { id:'d4e3', name:'Romanian DL (RDL)',sets:4, reps:'10-12',weight:'', rest:90,  notes:'Hinge at hips, feel hamstring stretch' },
      { id:'d4e4', name:'Leg Curls',       sets:4, reps:'12-15',weight:'', rest:60,  notes:'Full ROM, pause at top' },
      { id:'d4e5', name:'Calf Raise',      sets:4, reps:'15-20',weight:'', rest:45,  notes:'Slow negative, full stretch at bottom' }
    ]
  }
];

/* In-memory split state (persisted to localStorage per user) */
let splitData      = [];   // array of 4 day objects with exercises
let activeSplitDay = 1;    // which day tab is open (1-4)
let addExTargetDay = 1;    // which day the add-exercise modal targets
let editingExId    = null; // id of exercise being edited

/* ── SPLIT STORAGE (localStorage — no extra Supabase table needed) ── */
function splitKey()   { return 'ff_split_' + (currentUser?.id || 'guest'); }
function splitDayKey(){ return 'ff_splitday_' + (currentUser?.id || 'guest'); }

function loadSplitData() {
  const raw = localStorage.getItem(splitKey());
  if (raw) {
    splitData = JSON.parse(raw);
  } else {
    /* Deep-clone default and give each exercise a unique id */
    splitData = DEFAULT_SPLIT.map(d => ({
      ...d,
      exercises: d.exercises.map(e => ({ ...e, id: 'e_' + Date.now() + '_' + Math.random().toString(36).slice(2), done: false, sets_log: [] }))
    }));
    saveSplitData();
  }
  /* Load which day is "today" in the cycle */
  const saved = localStorage.getItem(splitDayKey());
  activeSplitDay = saved ? parseInt(saved) : getCurrentCycleDay();
}

function saveSplitData() {
  localStorage.setItem(splitKey(), JSON.stringify(splitData));
}

function saveActiveSplitDay() {
  localStorage.setItem(splitDayKey(), String(activeSplitDay));
}

/* Calculate which day in the 4-day cycle today is, based on the app start date */
function getCurrentCycleDay() {
  const startKey = 'ff_splitstart_' + (currentUser?.id || 'guest');
  let start = localStorage.getItem(startKey);
  if (!start) {
    start = new Date().toISOString().split('T')[0];
    localStorage.setItem(startKey, start);
  }
  const diff  = Math.floor((new Date() - new Date(start + 'T00:00:00')) / 86400000);
  return (diff % 4) + 1;
}

function resetSplitDay() {
  if (!confirm('Reset today to Day 1 (Chest & Shoulders)?')) return;
  const startKey = 'ff_splitstart_' + (currentUser?.id || 'guest');
  localStorage.setItem(startKey, new Date().toISOString().split('T')[0]);
  activeSplitDay = 1;
  saveActiveSplitDay();
  renderSplitPage();
  toast('Reset to Day 1 — Chest & Shoulders 💪', '🔀');
}

/* ── RENDER SPLIT PAGE ── */
function renderSplitPage() {
  loadSplitData();
  const todayCycle = getCurrentCycleDay();

  /* Today banner */
  const todayDayObj = splitData.find(d => d.day === todayCycle);
  if (todayDayObj) {
    const totalEx  = todayDayObj.exercises.length;
    const doneEx   = todayDayObj.exercises.filter(e => e.done).length;
    const circ     = 2 * Math.PI * 22;
    const offset   = circ * (1 - doneEx / Math.max(totalEx, 1));
    document.getElementById('todaySplitBanner').innerHTML = `
      <div class="today-split-banner">
        <div class="tsb-left">
          <div class="tsb-label">Today's Training</div>
          <div class="tsb-day">Day ${todayDayObj.day}: ${todayDayObj.name}</div>
          <div class="tsb-focus">${todayDayObj.muscles.join(' · ')}</div>
        </div>
        <div class="tsb-right">
          <div class="sp-ring" style="width:56px;height:56px;">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="5"/>
              <circle cx="28" cy="28" r="22" fill="none" stroke="${todayDayObj.textColor}" stroke-width="5"
                stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
                stroke-linecap="round" transform="rotate(-90 28 28)"/>
            </svg>
            <div class="sp-ring-ctr" style="font-size:13px;">${doneEx}/${totalEx}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px;color:rgba(255,255,255,.4);">${doneEx === totalEx && totalEx > 0 ? '🎉 Complete!' : 'exercises done'}</div>
            <button class="btn btn-primary btn-sm" style="margin-top:6px;" onclick="setActiveSplitDay(${todayDayObj.day})">Open →</button>
          </div>
        </div>
      </div>`;
  }

  /* Day tabs */
  document.getElementById('splitDayTabs').innerHTML = splitData.map(d => {
    const done   = d.exercises.filter(e => e.done).length;
    const isAct  = d.day === activeSplitDay;
    const isTod  = d.day === todayCycle;
    return `<div class="split-tab ${isAct ? 'active-tab' : ''} ${isTod ? 'today-tab' : ''}"
              onclick="setActiveSplitDay(${d.day})">
      <div class="split-tab-num">Day ${d.day}${isTod ? ' — Today' : ''}</div>
      <div class="split-tab-name">${d.icon} ${d.name}</div>
      <div class="split-tab-count">${d.exercises.length} exercises · ${done} done</div>
    </div>`;
  }).join('');

  /* Day content */
  renderSplitDayContent();
}

function setActiveSplitDay(day) {
  activeSplitDay = day;
  saveActiveSplitDay();
  renderSplitPage();
}

function renderSplitDayContent() {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;

  const doneCount = dayObj.exercises.filter(e => e.done).length;
  const total     = dayObj.exercises.length;
  const pct       = total ? Math.round((doneCount / total) * 100) : 0;

  let html = `<div class="split-day-panel">`;

  /* Progress bar */
  html += `<div class="split-progress-row">
    <div class="sp-ring">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="22" fill="none" stroke="${dayObj.color}" stroke-width="5"/>
        <circle cx="28" cy="28" r="22" fill="none" stroke="${dayObj.textColor}" stroke-width="5"
          stroke-dasharray="${(2*Math.PI*22).toFixed(1)}"
          stroke-dashoffset="${(2*Math.PI*22*(1-pct/100)).toFixed(1)}"
          stroke-linecap="round" transform="rotate(-90 28 28)"/>
      </svg>
      <div class="sp-ring-ctr" style="color:${dayObj.textColor}">${pct}%</div>
    </div>
    <div class="sp-info">
      <div class="sp-title">Day ${dayObj.day}: ${dayObj.name}</div>
      <div class="sp-sub">${doneCount} of ${total} exercises done · Muscles: ${dayObj.muscles.join(', ')}</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" onclick="markDaySplitDone()">✓ All done</button>
      <button class="btn btn-ghost btn-sm" onclick="resetDaySplit()">↺ Reset</button>
    </div>
  </div>`;

  /* Exercise cards */
  if (!dayObj.exercises.length) {
    html += `<div class="split-empty">
      <div style="font-size:40px;margin-bottom:10px;">${dayObj.icon}</div>
      <div style="font-size:16px;font-weight:600;margin-bottom:6px;">No exercises yet</div>
      <div style="font-size:13px;color:var(--text3);margin-bottom:16px;">Click "+ Add Exercise" to build your Day ${dayObj.day} workout.</div>
      <button class="btn btn-primary" onclick="openAddExModal()">+ Add Exercise</button>
    </div>`;
  } else {
    dayObj.exercises.forEach((ex, idx) => {
      const setsLog = ex.sets_log || [];
      /* Ensure sets_log has enough rows */
      while (setsLog.length < (ex.sets || 3)) {
        setsLog.push({ weight: ex.weight || '', reps: ex.reps || '', done: false });
      }
      ex.sets_log = setsLog;

      const doneAllSets = setsLog.length > 0 && setsLog.every(s => s.done);
      if (doneAllSets && !ex.done) { ex.done = true; saveSplitData(); }

      html += `<div class="ex-card ${ex.done ? 'ex-done' : ''}" id="exc-${ex.id}">
        <div class="ex-card-top" onclick="toggleSetPanel('${ex.id}')">
          <div class="ex-order">${idx + 1}</div>
          <div class="ex-main">
            <div class="ex-name">${ex.name}</div>
            <div class="ex-meta">
              <span class="ex-meta-item">📋 ${ex.sets || 3} sets</span>
              <span class="ex-meta-item">🔄 ${ex.reps || '—'} reps</span>
              ${ex.weight ? `<span class="ex-meta-item">⚖️ ${ex.weight}kg</span>` : ''}
              ${ex.rest   ? `<span class="ex-meta-item">⏱ ${ex.rest}s rest</span>` : ''}
              <span class="ex-meta-item" style="color:${ex.done ? '#0D6858':'#96938C'};">${ex.done ? '✓ Done' : setsLog.filter(s=>s.done).length + '/' + setsLog.length + ' sets'}</span>
            </div>
          </div>
          <div class="ex-actions" onclick="event.stopPropagation()">
            <button class="ex-done-btn" onclick="toggleExDone('${ex.id}')" title="${ex.done ? 'Mark undone' : 'Mark done'}">${ex.done ? '↩' : '✓'}</button>
            <button class="ex-edit-btn" onclick="openEditExModal('${ex.id}')" title="Edit">✏️</button>
            <button class="ex-del-btn"  onclick="deleteExercise('${ex.id}')" title="Delete">🗑</button>
          </div>
        </div>
        <div class="ex-sets-panel" id="sp-${ex.id}">
          <div class="set-row">
            <div class="set-lbl">Set</div>
            <div class="set-lbl">Weight (kg)</div>
            <div class="set-lbl">Reps</div>
            <div class="set-lbl">Done</div>
            <div></div>
          </div>
          ${setsLog.map((s, si) => `
          <div class="set-row" id="sr-${ex.id}-${si}">
            <div class="set-num">${si + 1}</div>
            <input class="set-input" type="number" placeholder="kg" value="${s.weight || ''}" step="0.5"
              onchange="updateSetLog('${ex.id}',${si},'weight',this.value)" />
            <input class="set-input" type="text" placeholder="reps" value="${s.reps || ''}"
              onchange="updateSetLog('${ex.id}',${si},'reps',this.value)" />
            <input class="set-done-chk" type="checkbox" ${s.done ? 'checked' : ''}
              onchange="updateSetLog('${ex.id}',${si},'done',this.checked)" />
            <button class="ex-del-btn" onclick="removeSet('${ex.id}',${si})" style="width:24px;height:24px;font-size:12px;" title="Remove set">✕</button>
          </div>`).join('')}
          <button class="add-set-btn" onclick="addSet('${ex.id}')">+ Add Set</button>
          ${ex.notes ? `<div class="ex-notes-tip">💡 ${ex.notes}</div>` : ''}
        </div>
      </div>`;
    });
  }

  html += `<div style="margin-top:14px;display:flex;gap:10px;align-items:center;">
    <button class="btn btn-primary" onclick="openAddExModal()">+ Add Exercise</button>
    <span style="font-size:12px;color:var(--text3)">Tap any exercise to track sets & reps</span>
  </div></div>`;

  document.getElementById('splitDayContent').innerHTML = html;
}

/* ── SET TRACKING ── */
function toggleSetPanel(exId) {
  const panel = document.getElementById('sp-' + exId);
  if (panel) panel.classList.toggle('open');
}

function updateSetLog(exId, setIdx, field, value) {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  if (!ex) return;
  if (!ex.sets_log) ex.sets_log = [];
  if (!ex.sets_log[setIdx]) ex.sets_log[setIdx] = { weight:'', reps:'', done:false };
  ex.sets_log[setIdx][field] = field === 'done' ? Boolean(value) : value;
  /* Auto-mark exercise done if all sets checked */
  if (ex.sets_log.length > 0 && ex.sets_log.every(s => s.done)) {
    ex.done = true;
  } else {
    ex.done = false;
  }
  saveSplitData();
  /* Refresh just the counter text without full re-render */
  renderSplitPage();
}

function addSet(exId) {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  if (!ex) return;
  if (!ex.sets_log) ex.sets_log = [];
  ex.sets_log.push({ weight: ex.weight || '', reps: ex.reps || '', done: false });
  ex.sets++;
  saveSplitData();
  renderSplitPage();
  /* Re-open the panel */
  setTimeout(() => {
    const panel = document.getElementById('sp-' + exId);
    if (panel) panel.classList.add('open');
  }, 50);
}

function removeSet(exId, setIdx) {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  if (!ex || !ex.sets_log || ex.sets_log.length <= 1) return;
  ex.sets_log.splice(setIdx, 1);
  ex.sets = ex.sets_log.length;
  saveSplitData();
  renderSplitPage();
  setTimeout(() => {
    const panel = document.getElementById('sp-' + exId);
    if (panel) panel.classList.add('open');
  }, 50);
}

function toggleExDone(exId) {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  if (!ex) return;
  ex.done = !ex.done;
  if (ex.done && ex.sets_log) ex.sets_log.forEach(s => { s.done = true; });
  else if (!ex.done && ex.sets_log) ex.sets_log.forEach(s => { s.done = false; });
  saveSplitData();
  renderSplitPage();
  toast(ex.done ? `${ex.name} done! 🎉` : 'Marked undone', ex.done ? '✓' : '↩');
}

function markDaySplitDone() {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  dayObj.exercises.forEach(ex => {
    ex.done = true;
    if (ex.sets_log) ex.sets_log.forEach(s => { s.done = true; });
  });
  saveSplitData();
  renderSplitPage();
  toast(`Day ${activeSplitDay} complete! 🎉`, '🏆');
}

function resetDaySplit() {
  if (!confirm('Reset all exercises for this day?')) return;
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  dayObj.exercises.forEach(ex => {
    ex.done = false;
    if (ex.sets_log) ex.sets_log.forEach(s => { s.done = false; s.weight = ''; s.reps = ''; });
  });
  saveSplitData();
  renderSplitPage();
  toast('Day reset ↺', '↺');
}

/* ── ADD / EDIT EXERCISE MODAL ── */
function openAddExModal() {
  addExTargetDay = activeSplitDay;
  editingExId    = null;
  document.getElementById('addExDayLabel').textContent =
    'Day ' + activeSplitDay + ' — ' + (splitData.find(d => d.day === activeSplitDay)?.name || '');
  ['exName','exSets','exReps','exWeight','exRest','exNotes'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('exSets').value = '4';
  document.getElementById('exReps').value = '8-12';
  document.getElementById('exRest').value = '90';
  document.getElementById('addExModal').classList.add('open');
  setTimeout(() => document.getElementById('exName').focus(), 100);
}

function openEditExModal(exId) {
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  if (!ex) return;

  editingExId    = exId;
  addExTargetDay = activeSplitDay;
  document.getElementById('addExDayLabel').textContent = 'Edit Exercise';
  document.getElementById('exName').value   = ex.name;
  document.getElementById('exSets').value   = ex.sets || 4;
  document.getElementById('exReps').value   = ex.reps || '';
  document.getElementById('exWeight').value = ex.weight || '';
  document.getElementById('exRest').value   = ex.rest || 90;
  document.getElementById('exNotes').value  = ex.notes || '';
  document.getElementById('addExModal').classList.add('open');
}

function closeAddExModal() {
  document.getElementById('addExModal').classList.remove('open');
  editingExId = null;
}

function saveExercise() {
  const name   = document.getElementById('exName').value.trim();
  const sets   = parseInt(document.getElementById('exSets').value)  || 3;
  const reps   = document.getElementById('exReps').value.trim()     || '10';
  const weight = document.getElementById('exWeight').value.trim();
  const rest   = parseInt(document.getElementById('exRest').value)   || 90;
  const notes  = document.getElementById('exNotes').value.trim();

  if (!name) return toast('Enter an exercise name', '⚠');

  const dayObj = splitData.find(d => d.day === addExTargetDay);
  if (!dayObj) return;

  if (editingExId) {
    /* Edit existing */
    const ex = dayObj.exercises.find(e => e.id === editingExId);
    if (ex) {
      ex.name   = name;
      ex.sets   = sets;
      ex.reps   = reps;
      ex.weight = weight;
      ex.rest   = rest;
      ex.notes  = notes;
      /* Resize sets_log if sets changed */
      while ((ex.sets_log || []).length < sets) (ex.sets_log || (ex.sets_log=[])).push({weight:'',reps:'',done:false});
    }
    toast(`${name} updated ✓`, '✓');
  } else {
    /* Add new */
    const newEx = {
      id:       'e_' + Date.now() + '_' + Math.random().toString(36).slice(2),
      name, sets, reps, weight, rest, notes,
      done:     false,
      sets_log: Array.from({length: sets}, () => ({ weight: weight||'', reps: reps||'', done: false }))
    };
    dayObj.exercises.push(newEx);
    toast(`${name} added to Day ${addExTargetDay} 💪`, '✓');
  }

  saveSplitData();
  closeAddExModal();
  renderSplitPage();
}

function deleteExercise(exId) {
  if (!confirm('Remove this exercise from the split?')) return;
  const dayObj = splitData.find(d => d.day === activeSplitDay);
  if (!dayObj) return;
  const ex = dayObj.exercises.find(e => e.id === exId);
  const nm = ex?.name || 'exercise';
  dayObj.exercises = dayObj.exercises.filter(e => e.id !== exId);
  saveSplitData();
  renderSplitPage();
  toast(`${nm} removed`, '🗑');
}

/* ── DASHBOARD: show today's split ── */
function renderTodaySplitDash() {
  loadSplitData();
  const todayCycle = getCurrentCycleDay();
  const dayObj     = splitData.find(d => d.day === todayCycle);
  const el         = document.getElementById('todayPlan');
  if (!el) return;

  if (!dayObj || !dayObj.exercises.length) {
    el.innerHTML = `<div class="empty-st" style="padding:16px 0"><div class="empty-ico">📅</div><div class="empty-sub">No plan.<br><span class="link-btn" onclick="goTo('split',document.querySelectorAll('.nav-btn')[1])">Open Split Program →</span></div></div>`;
    return;
  }

  const done  = dayObj.exercises.filter(e => e.done).length;
  const total = dayObj.exercises.length;

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:${dayObj.color};border-radius:12px;margin-bottom:10px;">
      <div>
        <div style="font-size:12px;font-weight:500;color:${dayObj.textColor};">Day ${dayObj.day} · ${dayObj.name}</div>
        <div style="font-size:11px;color:${dayObj.textColor};opacity:.7;">${done}/${total} exercises done</div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="goTo('split',document.querySelectorAll('.nav-btn')[1])" style="font-size:12px;">Open →</button>
    </div>
    <div class="wo-list">${dayObj.exercises.slice(0,4).map((ex, i) => `
      <div class="wo-item" style="${ex.done?'opacity:.5':''}">
        <div class="ex-order" style="background:${dayObj.color};color:${dayObj.textColor};width:34px;height:34px;font-size:12px;flex-shrink:0;">${i+1}</div>
        <div class="wo-info">
          <div class="wo-name" style="${ex.done?'text-decoration:line-through':''}">${ex.name}</div>
          <div class="wo-meta"><span>${ex.sets} sets</span><span>${ex.reps} reps</span>${ex.weight?`<span>${ex.weight}kg</span>`:''}</div>
        </div>
        <span style="font-size:11px;padding:3px 9px;border-radius:7px;background:${ex.done?'#E0F2EE':'#EDE9E2'};color:${ex.done?'#0D6858':'#96938C'};">${ex.done?'Done':'Todo'}</span>
      </div>`).join('')}
    ${total > 4 ? `<div style="text-align:center;font-size:12px;color:var(--text3);padding:8px 0;">+${total-4} more exercises</div>` : ''}</div>`;
}


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

/* Detect mobile */
function isMobile() { return window.innerWidth <= 768; }

/* mobileGoTo — syncs both desktop sidebar + mobile bottom nav */
function mobileGoTo(page, btn) {
  /* Update mobile bottom nav */
  document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  /* Also sync desktop sidebar */
  const sideMap = { dashboard:0, split:1, progress:2, goals:3, history:4, profile:5 };
  const idx = sideMap[page];
  if (idx !== undefined) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const sideBtn = document.querySelectorAll('.nav-btn')[idx];
    if (sideBtn) sideBtn.classList.add('active');
  }

  /* Navigate */
  goTo(page, null);
}

/* goTo — single navigation function for all screen sizes */
function goTo(page, btn) {
  /* Hide all pages, show target */
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');

  /* Sync desktop sidebar */
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  /* Sync mobile bottom nav */
  document.querySelectorAll('.mob-nav-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-page') === page);
  });

  /* Scroll to top on mobile */
  if (isMobile()) window.scrollTo({ top:0, behavior:'smooth' });

  /* Update mobile header */
  if (typeof updateMobileHeader === 'function') updateMobileHeader();

  /* Render page content */
  const renders = {
    dashboard: renderDashboard,
    split:     renderSplitPage,
    progress:  renderProgress,
    goals:     renderGoals,
    history:   () => renderHistory(allWorkouts),
    profile:   renderProfile
  };
  if (renders[page]) renders[page]();
}

/* Dedicated planner renderer that handles both desktop + mobile */
function renderPlannerPage() {
  buildDayList();
  buildMobileDayList();
  renderPlannerDay();
}

/* Mobile horizontal day scroll */
function buildMobileDayList() {
  const el = document.getElementById('dayListMobile');
  if (!el) return;
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  el.innerHTML = DAYS.map(day => {
    const count    = allPlanned.filter(p => getPDay(p) === day).length;
    const isToday  = day === todayName;
    const isActive = day === selectedDay;
    return `<div class="day-pill-mobile ${isActive ? 'active-day' : ''} ${count > 0 ? 'has-plan' : ''}"
              onclick="selectDay('${day}')">
      <div class="dp-name">${day.slice(0,3)} ${isToday ? '📅' : ''}</div>
      <div class="dp-count">${count ? count + ' ex' : 'rest'}</div>
    </div>`;
  }).join('');
}

/* Override selectDay to also refresh mobile list */
const _origSelectDay = selectDay;
function selectDay(day) {
  selectedDay = day;
  buildDayList();
  buildMobileDayList();
  renderPlannerDay();
}

/* Update mobile header */
function updateMobileHeader() {
  /* Avatar initials */
  if (currentUser) {
    const f   = currentUser.firstName || '';
    const l   = currentUser.lastName  || '';
    const ava = (f[0] || '?').toUpperCase() + (l[0] || '').toUpperCase();
    const el  = document.getElementById('mobHdrAva');
    if (el) el.textContent = ava;
  }

  /* Today's split day badge */
  if (typeof getCurrentCycleDay === 'function') {
    const dayNum = getCurrentCycleDay();
    const badge  = document.getElementById('mobDayBadge');
    if (badge) badge.textContent = 'Day ' + dayNum;
  }
}

/* ── On resize: keep layout in sync ── */
window.addEventListener('resize', () => {
  updateMobileHeader();
});

/* ============================================================
   BOOT — auto-login if session already exists
   ============================================================ */
window.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('globalLoader').style.display = 'flex';
  try {
    const session = await DB.getSession();
    if (session && session.user) { await loadApp(session.user); return; }
  } catch (e) { console.error('Session check failed:', e.message); }
  document.getElementById('globalLoader').style.display = 'none';
  document.getElementById('authScreen').style.display   = 'flex';
});
