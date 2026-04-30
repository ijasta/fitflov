'use strict';

/* ============================================================
   FITFLOW ADMIN PORTAL
   ============================================================ */

const SUPABASE_URL = 'https://hlwgmbqndnetoqmbavnq.supabase.co';

// ⚠️ IMPORTANT: PASTE YOUR SERVICE ROLE KEY HERE!
// DO NOT upload this file to the internet. Keep it strictly local.
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsd2dtYnFuZG5ldG9xbWJhdm5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU5MDk2NywiZXhwIjoyMDkyMTY2OTY3fQ.3KRGMu0oy2J6sxwez4-SHEPh4guOdhAWKrRVsaNcxeg';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsd2dtYnFuZG5ldG9xbWJhdm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTA5NjcsImV4cCI6MjA5MjE2Njk2N30.yc_UABDoos3LIG9CO9mE_7zf4Htkh63mqqXyzXa2umk';

let adminSb = null;

window.addEventListener('DOMContentLoaded', async () => {
  if (SUPABASE_SERVICE_ROLE_KEY === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
    document.getElementById('setupBox').style.display = 'block';
    document.getElementById('usersTableBody').innerHTML = '<tr><td colspan="4" style="text-align:center; color:#D97706;">Missing API Key</td></tr>';
    return;
  }

  // Initialize Supabase with the Admin key
  adminSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Check if user is already logged in via main app (using Anon key)
  const publicSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { session } } = await publicSb.auth.getSession();
  
  if (session && session.user) {
    const user = session.user;
    const isSuperAdmin = user.email === 'ijasta3@gmail.com';
    const hasAdminRole = user.user_metadata?.is_admin === true;
    
    if (isSuperAdmin || hasAdminRole) {
      document.getElementById('loginGate').style.display = 'none';
      document.getElementById('adminApp').style.display = 'block';
      fetchUsers();
      fetchStats();
    }
  }
});

async function doAdminLogin() {
  const email = document.getElementById('adminEmail').value.trim().toLowerCase();
  const pass = document.getElementById('adminPass').value;
  const btn = document.getElementById('adminLoginBtn');
  const errEl = document.getElementById('loginErr');

  if (!email || !pass) {
    errEl.style.display = 'block';
    errEl.textContent = 'Please enter email and password.';
    return;
  }

  btn.textContent = 'Verifying...';
  errEl.style.display = 'none';

  try {
    const { data, error } = await adminSb.auth.signInWithPassword({ email, password: pass });
    if (error) throw new Error(error.message);

    const user = data.user;
    const isSuperAdmin = user.email === 'ijasta3@gmail.com';
    const hasAdminRole = user.user_metadata?.is_admin === true;

    if (!isSuperAdmin && !hasAdminRole) {
      throw new Error('Access Denied. You do not have admin privileges.');
    }

    // Success
    document.getElementById('loginGate').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';

    fetchUsers();
    fetchStats();
  } catch (e) {
    errEl.style.display = 'block';
    if (e.message.includes('Invalid login credentials')) {
      errEl.textContent = 'Email not found or incorrect password.';
    } else {
      errEl.textContent = e.message;
    }
  } finally {
    btn.textContent = 'Secure Login →';
  }
}

function toastMsg(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

async function fetchStats() {
  if (!adminSb) return;
  try {
    const { count: workoutCount, error: wErr } = await adminSb.from('workouts').select('*', { count: 'exact', head: true });
    if (!wErr && workoutCount !== null) {
      document.getElementById('statTotalWorkouts').textContent = workoutCount;
    }
  } catch(e) {
    console.error("Stats error", e);
  }
}

async function fetchUsers() {
  if (!adminSb) return;
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text3);">Loading...</td></tr>';
  
  try {
    const { data: { users }, error } = await adminSb.auth.admin.listUsers();
    
    if (error) throw error;

    document.getElementById('statTotalUsers').textContent = users.length;

    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text3);">No registered users.</td></tr>';
      return;
    }

    tbody.innerHTML = users.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const status = u.email_confirmed_at ? '<span style="color:#059669; font-weight:600;">Verified</span>' : '<span style="color:#D97706; font-weight:600;">Unverified</span>';
      
      const isSuperAdmin = u.email === 'ijasta3@gmail.com';
      const isAdmin = u.user_metadata?.is_admin === true || isSuperAdmin;
      const roleBadge = isAdmin ? '<span style="background:rgba(5,150,105,0.1); color:#059669; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:600;">Admin</span>' : '<span style="color:var(--text3); font-size:12px;">User</span>';
      
      const toggleBtn = isSuperAdmin ? '' : `<button class="btn btn-ghost" style="padding:4px 8px; font-size:11px;" onclick="toggleAdminStatus('${u.id}', ${!isAdmin})">${isAdmin ? 'Revoke Admin' : 'Make Admin'}</button>`;

      return `
        <tr>
          <td><strong>${u.email}</strong><br><small style="color:var(--text3); font-size:11px;">ID: ${u.id}</small></td>
          <td>${date}</td>
          <td>${roleBadge}</td>
          <td>${status}</td>
          <td style="display:flex; gap:8px;">
            ${toggleBtn}
            <button class="delete-btn" onclick="deleteUser('${u.id}', '${u.email}')">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

  } catch (err) {
    console.error("Error fetching users:", err);
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#EF4444;">Error fetching users: ${err.message}</td></tr>`;
  }
}

async function deleteUser(uid, email) {
  if (!confirm(`⚠️ ARE YOU SURE?\nThis will permanently delete the account for: ${email}\nThis cannot be undone.`)) {
    return;
  }

  try {
    // 1. Delete associated data first
    await adminSb.from('workouts').delete().eq('user_id', uid);
    await adminSb.from('planned_workouts').delete().eq('user_id', uid);
    await adminSb.from('goals').delete().eq('user_id', uid);
    await adminSb.from('split_data').delete().eq('user_id', uid);
    await adminSb.from('profiles').delete().eq('id', uid);

    // 2. Delete the auth account
    const { data, error } = await adminSb.auth.admin.deleteUser(uid);
    if (error) throw error;

    toastMsg(`Deleted user: ${email}`);
    fetchUsers(); // Refresh the list
    fetchStats();
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Error deleting user: " + err.message);
  }
}

async function toggleAdminStatus(uid, makeAdmin) {
  try {
    const { data, error } = await adminSb.auth.admin.updateUserById(uid, {
      user_metadata: { is_admin: makeAdmin }
    });
    if (error) throw error;
    toastMsg(makeAdmin ? 'Admin privileges granted.' : 'Admin privileges revoked.');
    fetchUsers();
  } catch (err) {
    console.error("Error updating role:", err);
    alert("Error updating role: " + err.message);
  }
}
