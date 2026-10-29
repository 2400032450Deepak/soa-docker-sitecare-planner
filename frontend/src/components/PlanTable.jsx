export default function PlanTable({ plans, onDelete }) {
  return (
    <section className="card">
      <h3>Maintenance Plans</h3>
      <p className="muted">{plans.length} plan{plans.length === 1 ? "" : "s"} found</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Website</th>
              <th>Plan Type</th>
              <th>Monthly Fee (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 && (
              <tr><td colSpan="6" className="empty">No plans yet. Add one above.</td></tr>
            )}
            {plans.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.websiteName}</td>
                <td>{p.planType}</td>
                <td>{p.monthlyFee}</td>
                <td>
                  <span className={`badge ${p.active ? "on" : "off"}`}>
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button className="icon-btn del" title="Delete" onClick={() => onDelete(p.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
