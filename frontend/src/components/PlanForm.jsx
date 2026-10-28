import { useEffect, useState } from "react";

const EMPTY = { websiteName: "", planType: "Basic", monthlyFee: "", active: true };
export const PLAN_TYPES = ["Basic", "Standard", "Premium"];

export default function PlanForm({ editingPlan, onSubmit, onCancel, fieldErrors }) {
  const [form, setForm] = useState(EMPTY);

  // Fill the form when a row is chosen for editing, reset otherwise
  useEffect(() => {
    setForm(editingPlan ? { ...editingPlan } : EMPTY);
  }, [editingPlan]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit({
      ...form,
      monthlyFee: form.monthlyFee === "" ? null : Number(form.monthlyFee),
    });
    if (ok && !editingPlan) setForm(EMPTY);
  };

  const isEditing = Boolean(editingPlan);

  return (
    <section className="card">
      <h3>{isEditing ? "Update Plan" : "Add New Plan"}</h3>
      <p className="muted">Enter the website and maintenance plan details.</p>

      <form onSubmit={submit} noValidate>
        <label className="field">
          <span>Website Name *</span>
          <input name="websiteName" value={form.websiteName} onChange={change}
                 placeholder="e.g. example.com" />
          {fieldErrors.websiteName && <small className="error">{fieldErrors.websiteName}</small>}
        </label>

        <label className="field">
          <span>Plan Type *</span>
          <select name="planType" value={form.planType} onChange={change}>
            {PLAN_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          {fieldErrors.planType && <small className="error">{fieldErrors.planType}</small>}
        </label>

        <label className="field">
          <span>Monthly Fee (₹) *</span>
          <input name="monthlyFee" type="number" min="0" step="0.01"
                 value={form.monthlyFee} onChange={change} placeholder="e.g. 1500" />
          {fieldErrors.monthlyFee && <small className="error">{fieldErrors.monthlyFee}</small>}
        </label>

        <div className="toggle-row">
          <div>
            <strong>Active Plan</strong>
            <div className="muted">{form.active ? "This plan is active." : "This plan is inactive."}</div>
          </div>
          <label className="switch">
            <input type="checkbox" name="active" checked={form.active} onChange={change} />
            <span className="slider" />
          </label>
        </div>

        <div className="actions">
          <button type="submit" className="btn primary">
            {isEditing ? "Update Plan" : "+ Add Plan"}
          </button>
          {isEditing && (
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          )}
        </div>
      </form>
    </section>
  );
}
