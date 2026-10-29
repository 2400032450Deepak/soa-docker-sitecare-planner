import { useCallback, useEffect, useState } from "react";
import { addPlan, deletePlan, getPlans } from "./api";
import PlanForm from "./components/PlanForm.jsx";
import PlanTable from "./components/PlanTable.jsx";

export default function App() {
  const [plans, setPlans] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null);

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

  const handleSubmit = async (plan) => {
    setFieldErrors({});
    try {
      await addPlan(plan);
      notify("ok", "Plan added successfully");
      await load();
      return true;
    } catch (err) {
      if (err.response?.status === 400) {
        setFieldErrors(err.response.data);
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
          onSubmit={handleSubmit}
          onCancel={() => setFieldErrors({})}
          fieldErrors={fieldErrors}
        />
        <PlanTable
          plans={plans}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}
