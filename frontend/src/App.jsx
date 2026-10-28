import { useCallback, useEffect, useState } from "react";
import { addPlan, deletePlan, getPlans, updatePlan } from "./api";
import PlanForm from "./components/PlanForm.jsx";
import PlanTable from "./components/PlanTable.jsx";

export default function App() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null); // { type: "ok" | "err", text }

  const notify = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const load = useCallback(async () => {
    try {
      const res = await getPlans();
      setPlans(res.data);
    } catch {
      notify("err", "Cannot reach the backend. Is it running on port 8081?");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Returns true when saved, so the form knows whether to reset itself
  const handleSubmit = async (plan) => {
    setFieldErrors({});
    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, plan);
        notify("ok", "Plan updated successfully");
        setEditingPlan(null);
      } else {
        await addPlan(plan);
        notify("ok", "Plan added successfully");
      }
      await load();
      return true;
    } catch (err) {
      if (err.response?.status === 400) {
        setFieldErrors(err.response.data); // validation messages from Spring Boot
        notify("err", "Please fix the highlighted fields");
      } else {
        notify("err", "Something went wrong while saving");
      }
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      const res = await deletePlan(id);
      notify("ok", res.data);
      if (editingPlan?.id === id) setEditingPlan(null);
      await load();
    } catch {
      notify("err", "Delete failed");
    }
  };

  return (
    <>
      <header className="topbar">
        <strong>SiteCare Planner</strong>
        <span>Website Maintenance Management</span>
      </header>

      <main className="container">
        <div className="title-row">
          <div>
            <h2>Manage Maintenance Plans</h2>
            <p className="muted">Manage your websites and their maintenance plans in one place.</p>
          </div>
          <button className="btn" onClick={load}>⟳ Refresh</button>
        </div>

        {message && <div className={`toast ${message.type}`}>{message.text}</div>}

        <PlanForm
          editingPlan={editingPlan}
          onSubmit={handleSubmit}
          onCancel={() => { setEditingPlan(null); setFieldErrors({}); }}
          fieldErrors={fieldErrors}
        />
        <PlanTable
          plans={plans}
          onEdit={(p) => { setEditingPlan(p); setFieldErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}
