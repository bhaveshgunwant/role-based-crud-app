import { useState, useEffect, useRef } from "react";
import API from "./api";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:     #0d0d0d;
    --paper:   #f5f0e8;
    --cream:   #ede8dc;
    --accent:  #c8401a;
    --accent2: #2a5c8f;
    --muted:   #7a7060;
    --border:  #c8c0b0;
    --green:   #2d7a4f;
  }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
  }

  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    position: relative;
    overflow: hidden;
  }

  .app-shell::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent, transparent 39px, var(--border) 39px, var(--border) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, var(--border) 39px, var(--border) 40px);
    opacity: 0.35;
    pointer-events: none;
  }

  /* ── Card ── */
  .card {
    background: var(--paper);
    border: 1.5px solid var(--ink);
    box-shadow: 6px 6px 0 var(--ink);
    padding: 40px 44px;
    width: 100%;
    max-width: 420px;
    position: relative;
    animation: card-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes card-in {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  .card-stamp {
    position: absolute;
    top: -14px; right: 28px;
    background: var(--accent);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 12px;
    border: 1.5px solid var(--ink);
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 6px;
  }
  .logo span { color: var(--accent); }

  .subtitle {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* ── Fields ── */
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  }

  .field label {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .field input, .field textarea {
    background: var(--cream);
    border: 1.5px solid var(--border);
    padding: 10px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 13.5px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    resize: none;
  }

  .field textarea { min-height: 72px; }

  .field input:focus, .field textarea:focus {
    border-color: var(--ink);
    box-shadow: 3px 3px 0 var(--ink);
  }

  .field input::placeholder, .field textarea::placeholder { color: var(--muted); opacity: 0.7; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 22px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    border: 1.5px solid var(--ink);
    transition: transform 0.1s, box-shadow 0.1s;
    text-transform: uppercase;
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn:not(:disabled):active { transform: translate(2px,2px); box-shadow: none !important; }

  .btn-primary {
    background: var(--ink); color: var(--paper);
    box-shadow: 3px 3px 0 var(--accent); width: 100%; margin-top: 8px;
  }
  .btn-primary:not(:disabled):hover { box-shadow: 5px 5px 0 var(--accent); }

  .btn-ghost {
    background: transparent; color: var(--ink);
    box-shadow: 3px 3px 0 var(--border);
  }
  .btn-ghost:not(:disabled):hover { box-shadow: 5px 5px 0 var(--border); }

  .btn-danger {
    background: var(--accent); color: #fff;
    border-color: var(--ink); box-shadow: 3px 3px 0 var(--ink);
    padding: 5px 10px; font-size: 10px;
  }

  .btn-small { padding: 5px 12px; font-size: 10px; letter-spacing: 0.08em; }

  /* ── Admin reveal ── */
  .admin-toggle {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: var(--muted); text-decoration: underline;
    text-underline-offset: 3px; padding: 0; margin-top: 6px;
    transition: color 0.15s;
  }
  .admin-toggle:hover { color: var(--accent2); }

  .admin-box {
    background: var(--cream); border: 1.5px dashed var(--accent2);
    padding: 14px 16px; margin-top: 12px;
    animation: slide-down 0.25s ease both;
  }

  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .admin-label {
    font-size: 10px; color: var(--accent2);
    letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
  }
  .admin-label::before { content: '⬡'; font-size: 13px; }

  /* ── Switch / Messages ── */
  .switch-row {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; margin-top: 24px; font-size: 11.5px; color: var(--muted);
  }
  .switch-row button {
    background: none; border: none; font-family: 'DM Mono', monospace;
    font-size: 11.5px; color: var(--accent); cursor: pointer;
    text-decoration: underline; text-underline-offset: 3px; padding: 0;
  }

  .msg {
    font-size: 11.5px; padding: 9px 14px; border: 1.5px solid;
    margin-bottom: 16px; letter-spacing: 0.02em;
    animation: card-in 0.2s ease both;
  }
  .msg-error   { border-color: var(--accent); color: var(--accent); background: #fdf0ec; }
  .msg-success { border-color: var(--green);  color: var(--green);  background: #edf7f2; }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD
  ═══════════════════════════════════════════════════════ */
  .dashboard { width: 100%; max-width: 620px; animation: card-in 0.4s ease both; }

  .dash-header {
    display: flex; align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px; padding-bottom: 16px;
    border-bottom: 1.5px solid var(--ink);
  }

  .dash-logo { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
  .dash-logo span { color: var(--accent); }

  .dash-user { text-align: right; }
  .dash-user .name { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; }

  .role-badge {
    display: inline-block; font-size: 9px; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 2px 8px;
    border: 1px solid var(--ink); margin-top: 3px;
  }
  .role-badge.admin { background: var(--ink); color: var(--paper); }
  .role-badge.user  { background: transparent; color: var(--muted); }

  /* ── Add task panel ── */
  .add-panel {
    background: var(--cream); border: 1.5px solid var(--border);
    padding: 18px 20px; margin-bottom: 24px;
  }

  .add-panel-title {
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 14px;
  }

  .add-row { display: flex; gap: 10px; align-items: flex-start; }
  .add-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; }

  .add-fields input, .add-fields textarea {
    background: var(--paper); border: 1.5px solid var(--border);
    padding: 9px 12px; font-family: 'DM Mono', monospace;
    font-size: 13px; color: var(--ink); outline: none; width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s; resize: none;
  }
  .add-fields input:focus, .add-fields textarea:focus {
    border-color: var(--ink); box-shadow: 3px 3px 0 var(--ink);
  }
  .add-fields input::placeholder, .add-fields textarea::placeholder {
    color: var(--muted); opacity: 0.7;
  }
  .add-fields textarea { min-height: 58px; }

  /* ── Task list ── */
  .tasks-header {
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 10px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .task-count {
    background: var(--ink); color: var(--paper);
    font-size: 9px; font-family: 'Syne', sans-serif;
    font-weight: 700; padding: 1px 7px; border-radius: 999px;
  }

  .task-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }

  .task-item {
    background: var(--cream); border: 1.5px solid var(--border);
    padding: 14px 16px; transition: border-color 0.15s, box-shadow 0.15s, opacity 0.2s;
    animation: card-in 0.25s ease both;
  }
  .task-item:hover { border-color: var(--ink); box-shadow: 3px 3px 0 var(--ink); }
  .task-item.completed { opacity: 0.55; }

  .task-main { display: flex; align-items: flex-start; gap: 12px; }

  .task-checkbox {
    width: 17px; height: 17px; border: 1.5px solid var(--border);
    background: var(--paper); flex-shrink: 0; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; transition: background 0.15s, border-color 0.15s;
    margin-top: 2px;
  }
  .task-checkbox.checked { background: var(--green); border-color: var(--green); color: #fff; }
  .task-checkbox.busy    { opacity: 0.5; cursor: not-allowed; }

  .task-body { flex: 1; min-width: 0; }

  .task-title-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 3px; }
  .task-idx { font-size: 10px; color: var(--border); font-style: italic; flex-shrink: 0; }

  .task-title { font-size: 13.5px; flex: 1; }
  .task-title.done { text-decoration: line-through; color: var(--muted); }

  .task-title-edit {
    font-family: 'DM Mono', monospace; font-size: 13.5px;
    background: var(--paper); border: 1.5px solid var(--ink);
    padding: 2px 8px; color: var(--ink); outline: none; width: 100%;
  }

  .task-desc {
    font-size: 11.5px; color: var(--muted); margin-top: 4px;
    line-height: 1.5; padding-left: 25px;
  }

  .task-desc-edit {
    font-family: 'DM Mono', monospace; font-size: 11.5px;
    background: var(--paper); border: 1.5px solid var(--border);
    border-top: none;
    padding: 6px 8px; color: var(--ink); outline: none;
    width: 100%; resize: none; min-height: 56px;
    margin-top: 4px; line-height: 1.5;
    transition: border-color 0.15s;
  }
  .task-desc-edit:focus { border-color: var(--ink); }

  .task-owner {
    font-size: 10px; color: var(--accent2); letter-spacing: 0.04em;
    margin-top: 5px; padding-left: 25px;
    display: flex; align-items: center; gap: 4px;
  }
  .task-owner::before { content: '↳'; }

  .task-actions {
    display: flex; gap: 6px; align-items: center; flex-shrink: 0; margin-top: 1px;
  }

  .btn-edit {
    background: transparent; border: 1.5px solid var(--border);
    color: var(--muted); padding: 4px 9px; font-size: 10px;
    font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: 0.06em;
    cursor: pointer; text-transform: uppercase;
    transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
  }
  .btn-edit:hover    { border-color: var(--ink); color: var(--ink); box-shadow: 2px 2px 0 var(--ink); }
  .btn-edit.save     { border-color: var(--green); color: var(--green); }
  .btn-edit.cancel-e { border-color: var(--border); color: var(--muted); }

  .empty-state {
    text-align: center; padding: 40px 20px; color: var(--muted);
    font-size: 12px; letter-spacing: 0.05em;
    border: 1.5px dashed var(--border);
  }
  .empty-state .icon { font-size: 28px; margin-bottom: 12px; display: block; }

  .dash-footer {
    display: flex; justify-content: flex-end;
    margin-top: 24px; padding-top: 16px;
    border-top: 1px solid var(--border);
  }
`;

function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

function Msg({ text, type = "error" }) {
  if (!text) return null;
  return <div className={`msg msg-${type}`}>{text}</div>;
}


// LOGIN

function LoginPage({ onLogin, onSwitch }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const login = async () => {
    if (!email || !password) return setError("All fields are required.");
    setError(""); setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <div className="card-stamp">Sign In</div>
      <div className="logo">Task<span>.</span></div>
      <div className="subtitle">Your daily command center</div>

      <Msg text={error} />

      <div className="field">
        <label>Email address</label>
        <input placeholder="you@example.com" type="email"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()} />
      </div>
      <div className="field">
        <label>Password</label>
        <input placeholder="••••••••" type="password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()} />
      </div>

      <button className="btn btn-primary" onClick={login} disabled={loading}>
        {loading ? "Signing in…" : "→ Sign In"}
      </button>

      <div className="switch-row">
        No account? <button onClick={onSwitch}>Create one</button>
      </div>
    </div>
  );
}

// REGISTER
function RegisterPage({ onLogin, onSwitch }) {
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [adminKey, setAdminKey]   = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [loading, setLoading]     = useState(false);

  const register = async () => {
    if (!name || !email || !password) return setError("All fields are required.");
    setError(""); setSuccess(""); setLoading(true);
    try {
      const payload = { name, email, password };
      // Backend checks adminKey === process.env.ADMIN_SECRET and sets role:"admin"
      if (showAdmin && adminKey.trim()) payload.adminKey = adminKey.trim();

      const res = await API.post("/auth/register", payload);
      setSuccess("Account created! Signing you in…");
      setTimeout(() => onLogin(res.data.user), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <div className="card-stamp">New Account</div>
      <div className="logo">Task<span>.</span></div>
      <div className="subtitle">Let's get you set up</div>

      <Msg text={error} />
      <Msg text={success} type="success" />

      <div className="field">
        <label>Full name</label>
        <input placeholder="Ada Lovelace" value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && register()} />
      </div>
      <div className="field">
        <label>Email address</label>
        <input placeholder="you@example.com" type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && register()} />
      </div>
      <div className="field">
        <label>
          Password{" "}
          <span style={{ color: "var(--muted)", fontSize: "9px" }}>(min. 6 chars)</span>
        </label>
        <input placeholder="••••••••" type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && register()} />
      </div>

      {/* Admin key — only sent if revealed AND non-empty */}
      <button className="admin-toggle" onClick={() => setShowAdmin(v => !v)}>
        {showAdmin ? "↑ hide admin section" : "I have an admin secret key"}
      </button>

      {showAdmin && (
        <div className="admin-box">
          <div className="admin-label">Admin Access</div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Secret key</label>
            <input placeholder="Enter admin key…" type="password"
              value={adminKey} onChange={e => setAdminKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && register()} />
          </div>
        </div>
      )}

      <button className="btn btn-primary" style={{ marginTop: 20 }}
        onClick={register} disabled={loading}>
        {loading ? "Creating…" : "→ Create Account"}
      </button>

      <div className="switch-row">
        Already have one? <button onClick={onSwitch}>Sign in</button>
      </div>
    </div>
  );
}


function TaskItem({ task, index, isAdmin, onUpdate, onDelete }) {
  const [editing, setEditing]     = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc]   = useState(task.description || "");
  const [saving, setSaving]       = useState(false);
  const [toggling, setToggling]   = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  // Keep local edit fields fresh whenever the task prop updates (e.g. after a save)
  useEffect(() => {
    if (!editing) {
      setEditTitle(task.title);
      setEditDesc(task.description || "");
    }
  }, [task.title, task.description]);

  // PUT — toggle completed
  const toggleCompleted = async () => {
    if (toggling) return;
    setToggling(true);
    try {
      const res = await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      onUpdate(res.data.task);
    } catch { }
    finally { setToggling(false); }
  };

  // PUT — save edited title + description together
  const saveEdit = async () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) { setEditTitle(task.title); setEditing(false); return; }
    // Skip network call if nothing changed
    if (trimmedTitle === task.title && editDesc.trim() === (task.description || "")) {
      setEditing(false); return;
    }
    setSaving(true);
    try {
      const res = await API.put(`/tasks/${task._id}`, {
        title: trimmedTitle,
        description: editDesc.trim(),   // empty string clears it on the backend
      });
      onUpdate(res.data.task);
      setEditing(false);
    } catch {
      setEditTitle(task.title);
      setEditDesc(task.description || "");
      setEditing(false);
    } finally { setSaving(false); }
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-main">

        {/* Completed checkbox → PUT /tasks/:id { completed } */}
        <div
          className={`task-checkbox ${task.completed ? "checked" : ""} ${toggling ? "busy" : ""}`}
          onClick={toggleCompleted}
          title={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed ? "✓" : ""}
        </div>

        <div className="task-body">
          <div className="task-title-row">
            <span className="task-idx">{String(index + 1).padStart(2, "0")}.</span>

            {editing ? (
              <input
                ref={inputRef}
                className="task-title-edit"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter")  saveEdit();
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              <span className={`task-title ${task.completed ? "done" : ""}`}>
                {task.title}
              </span>
            )}
          </div>

          {/* Description — editable textarea in edit mode, plain text otherwise */}
          {editing ? (
            <textarea
              className="task-desc-edit"
              placeholder="Description (optional) — leave blank to clear"
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              onKeyDown={e => e.key === "Escape" && cancelEdit()}
            />
          ) : (
            task.description && (
              <div className="task-desc">{task.description}</div>
            )
          )}

          {/* Admin view: populated user field */}
          {isAdmin && task.user && typeof task.user === "object" && (
            <div className="task-owner">
              {task.user.name}
              <span style={{ color: "var(--border)" }}>·</span>
              {task.user.email}
            </div>
          )}
        </div>

        <div className="task-actions">
          {editing ? (
            <>
              <button className="btn-edit save"    onClick={saveEdit}   disabled={saving}>
                {saving ? "…" : "Save"}
              </button>
              <button className="btn-edit cancel-e" onClick={cancelEdit}>✕</button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setEditing(true)}>Edit</button>
          )}
          <button className="btn btn-danger" onClick={() => onDelete(task._id)}>del</button>
        </div>
      </div>
    </li>
  );
}


// DASHBOARD

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks]      = useState([]);
  const [title, setTitle]      = useState("");
  const [description, setDesc] = useState("");
  const [error, setError]      = useState("");
  const [loading, setLoading]  = useState(false);
  const [adding, setAdding]    = useState(false);
  const titleRef = useRef(null);

  const isAdmin = user.role === "admin";

  useEffect(() => { fetchTasks(); }, []);

  // GET /api/tasks
  // Admin → Task.find().populate("user","name email")
  // User  → Task.find({ user: req.user._id })
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      if (err.response?.status === 401) onLogout();
      else setError("Could not load tasks.");
    } finally { setLoading(false); }
  };

  // POST /api/tasks  { title, description? }
  const createTask = async () => {
    if (!title.trim()) return;
    setAdding(true);
    try {
      const payload = { title: title.trim() };
      if (description.trim()) payload.description = description.trim();
      const res = await API.post("/tasks", payload);
      // Prepend so newest shows first
      setTasks(prev => [res.data.task, ...prev]);
      setTitle(""); setDesc("");
      titleRef.current?.focus();
    } catch (err) {
      if (err.response?.status === 401) onLogout();
      else setError("Could not add task.");
    } finally { setAdding(false); }
  };

  // Patch local list after PUT (edit or toggle)
  const handleUpdate = (updated) =>
    setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));

  // DELETE /api/tasks/:id
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      if (err.response?.status === 401) onLogout();
      else if (err.response?.status === 403) setError("You can't delete this task.");
      else setError("Could not delete task.");
    }
  };

  // POST /api/auth/logout → clears httpOnly cookie
  const logout = async () => {
    try { await API.post("/auth/logout"); } catch { /* ignore */ }
    onLogout();
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div>
          <div className="dash-logo">Task<span>.</span></div>
          {isAdmin && (
            <div style={{ fontSize: "10px", color: "var(--accent2)", marginTop: "4px", letterSpacing: "0.05em" }}>
              Viewing all users' tasks
            </div>
          )}
        </div>
        <div className="dash-user">
          <div className="name">{user.name}</div>
          <div className={`role-badge ${isAdmin ? "admin" : "user"}`}>{user.role}</div>
        </div>
      </div>

      <Msg text={error} />

      {/* Add task */}
      <div className="add-panel">
        <div className="add-panel-title">+ New Task</div>
        <div className="add-row">
          <div className="add-fields">
            <input
              ref={titleRef}
              placeholder="Task title (required)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && createTask()}
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <button className="btn btn-ghost"
            onClick={createTask}
            disabled={adding || !title.trim()}>
            {adding ? "…" : "+ Add"}
          </button>
        </div>
      </div>

      {/* List header */}
      <div className="tasks-header">
        <span>
          {isAdmin ? "All Tasks" : "My Tasks"}
          {completedCount > 0 && (
            <span style={{ marginLeft: "10px", color: "var(--green)", fontSize: "9px" }}>
              {completedCount}/{tasks.length} done
            </span>
          )}
        </span>
        <span className="task-count">{tasks.length}</span>
      </div>

      {loading ? (
        <div className="empty-state">
          <span className="icon" style={{ fontSize: "16px" }}>◌</span>
          Loading…
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <span className="icon">◻</span>
          No tasks yet — add one above
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((t, i) => (
            <TaskItem
              key={t._id}
              task={t}
              index={i}
              isAdmin={isAdmin}
              onUpdate={handleUpdate}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      <div className="dash-footer">
        <button className="btn btn-ghost btn-small" onClick={logout}>↩ Sign out</button>
      </div>
    </div>
  );
}


//  ROOT

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  const handleLogout = () => { setUser(null); setPage("login"); };

  return (
    <>
      <GlobalStyles />
      <div className="app-shell">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : page === "login" ? (
          <LoginPage    onLogin={setUser} onSwitch={() => setPage("register")} />
        ) : (
          <RegisterPage onLogin={setUser} onSwitch={() => setPage("login")} />
        )}
      </div>
    </>
  );
}