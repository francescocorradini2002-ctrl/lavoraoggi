import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    pay: "",
    category: "Traslochi",
    work_date: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setJobs(data);
  }

  async function createJob(e) {
    e.preventDefault();

    const { error } = await supabase.from("jobs").insert([
      {
        title: form.title,
        description: form.description,
        city: form.city,
        pay: Number(form.pay),
        category: form.category,
        work_date: form.work_date,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Errore nella pubblicazione");
      return;
    }

    setForm({
      title: "",
      description: "",
      city: "",
      pay: "",
      category: "Traslochi",
      work_date: "",
    });

    loadJobs();
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f7f7f7", minHeight: "100vh", padding: "40px" }}>
      <h1>Handy</h1>
      <p>Trova aiuto affidabile vicino a te.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", maxWidth: "1100px" }}>
        <section style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <h2>Pubblica un annuncio</h2>

          <form onSubmit={createJob}>
            <input
              placeholder="Titolo"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />

            <textarea
              placeholder="Descrizione"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              style={inputStyle}
            />

            <input
              placeholder="Città"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Compenso (€)"
              value={form.pay}
              onChange={(e) => setForm({ ...form, pay: e.target.value })}
              required
              style={inputStyle}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={inputStyle}
            >
              <option>Traslochi</option>
              <option>Giardinaggio</option>
              <option>Pulizie</option>
              <option>Tuttofare</option>
              <option>Eventi</option>
              <option>Pet sitting</option>
              <option>Altro</option>
            </select>

            <input
              type="date"
              value={form.work_date}
              onChange={(e) => setForm({ ...form, work_date: e.target.value })}
              required
              style={inputStyle}
            />

            <button style={buttonStyle}>Pubblica annuncio</button>
          </form>
        </section>

        <section>
          <h2>Annunci disponibili</h2>

          {jobs.map((job) => (
            <div key={job.id} style={{ background: "white", padding: "20px", borderRadius: "16px", marginBottom: "15px" }}>
              <small>{job.category}</small>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>📍 {job.city}</p>
              <p>📅 {job.work_date}</p>
              <p>💰 €{job.pay}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background: "#111",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default App;