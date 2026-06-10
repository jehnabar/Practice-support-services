import React, { useState } from 'react';

const SERVICES = [
  { id: 1, name: "Email Triage & Inbox Organization", desc: "Sort, label, draft responses to general inquiries, flag urgent items for you.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 30, category: "async" },
  { id: 2, name: "EHR Data Entry & Form Input", desc: "Input demographics, insurance details, and intake forms into your system.", format: "No phone", availability: "Flexible", suggested: 30, category: "async" },
  { id: 3, name: "Intake Packet Review & Prep", desc: "Review completed paperwork and flag items before new client's first session.", format: "No phone", availability: "Early AM, Evenings", suggested: 32, category: "async" },
  { id: 4, name: "Cancellation & Waitlist Management", desc: "Maintain your waitlist spreadsheet and track cancellations systematically.", format: "No phone", availability: "Flexible", suggested: 30, category: "async" },
  { id: 5, name: "Insurance Panel Research", desc: "Research open panels in your state and compile credentialing requirements. May require calls to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 38, category: "phone" },
  { id: 6, name: "Referral & Resource Database", desc: "Build and maintain a spreadsheet of local psychiatrists, PCPs, schools, community resources. May require calls to local businesses to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 32, category: "phone" },
  { id: 11, name: "Directory Listing Audit", desc: "Review Psychology Today, Headway, Alma, and other profiles for accuracy and optimization. Includes enrolling or adding your practice to new directories.", format: "No phone", availability: "Evenings, Weekends", suggested: 35, category: "async" },
  { id: 12, name: "License Renewal & CE Tracking", desc: "Create tracker and monitor staff/intern license expiration, associate hour accruals or CE hours.", format: "No phone", availability: "Flexible", suggested: 30, category: "async" },
  { id: 16, name: "Quality Assurance — Notes, Diagnoses & Treatment Plans", desc: "Peer review of clinical documentation for completeness, coding accuracy, and regulatory compliance. Includes auditing progress notes, diagnosis codes, and treatment plan structure. Non-supervisory; no clinical guidance provided.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, category: "qa" },
  { id: 17, name: "Practice Consulting", desc: "Strategic operational consulting on workflow design, system selection, onboarding processes, and practice efficiency. Ideal for solo providers building systems or group practices scaling up.", format: "No phone", availability: "Flexible", suggested: 70, category: "qa" },
  { id: 14, name: "Warm Referral Outreach Calls", desc: "Call referral sources and community partners on your behalf to share your availability.", format: "Phone required", availability: "Daytime", suggested: 50, category: "phone" },
  { id: 15, name: "Insurance Benefits Verification Calls", desc: "Verify client benefits and document coverage details before intake.", format: "Phone required", availability: "Daytime", suggested: 42, category: "phone" },
  { id: 7, name: "Content Writing", desc: "Newsletters, blog posts, and social media content for your practice — in your voice.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 65, category: "creative" },
  { id: 8, name: "Website Copy Refresh", desc: "Update your About, Services, and FAQ pages with fresh, accurate language.", format: "No phone", availability: "Evenings, Weekends", suggested: 70, category: "creative" },
  { id: 9, name: "Progress Note Sample Design", desc: "Craft customizable note samples aligned to your modalities (CBT, EMDR, etc.).", format: "No phone", availability: "Evenings, Weekends", suggested: 55, category: "creative" },
  { id: 10, name: "SOP & Workflow Documentation", desc: "Document your workflows so your practice can run smoothly even when you step back.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, category: "creative" },
  { id: 13, name: "New Client Onboarding Welcome Kit", desc: "Design a polished branded welcome packet experience for new clients.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, category: "creative" },
  { id: 18, name: '"Phone a Friend" Lifeline', desc: "Sometimes you just need to talk it through so you can stop procrastinating. Should I charge the late cancellation fee this time? Is this rate increase too much? Now you have someone to bounce ideas with — a fellow clinician who gets it.", format: "Phone", availability: "Flexible", suggested: 50, category: "qa" },
];

const PACKAGES = [
  { id: "starter", name: "Starter Relief", hours: 5, desc: "Perfect for the solo practitioner who needs occasional help without commitment.", includes: ["Email triage", "EHR data entry", "1 task of your choice"], suggested: 225, color: "#d4edda", range: [0, 250] },
  { id: "steady", name: "Steady Support", hours: 10, desc: "For the growing practice ready to reclaim their evenings and weekends.", includes: ["Inbox management", "Waitlist tracking", "Intake prep", "Insurance research"], suggested: 475, color: "#d1ecf1", range: [251, 500] },
  { id: "full", name: "Full Operations", hours: 20, desc: "Comprehensive support for group practices or high-volume solo providers.", includes: ["All async tasks", "Phone tasks", "SOP documentation", "Monthly practice audit", "QA review"], suggested: 950, color: "#e2d9f3", range: [501, 99999] },
  { id: "creative", name: "Creative Services", hours: null, desc: "Dedicated creative support — content writing, web copy, templates, onboarding kits, and workflow docs.", includes: ["Content writing", "Website copy", "Note samples", "Onboarding kits", "SOP docs"], suggested: 65, color: "#fde8f5", range: null },
  { id: "custom", name: "Name Your Budget", hours: null, desc: "You tell me what you need and what you can spend. We'll build something that works.", includes: ["Fully flexible scope", "Any combination of services", "No pressure, no minimums"], suggested: null, color: "#fff3cd", range: null },
];

const STEPS = ["Services", "Package", "Schedule", "Budget & Book"];

const categoryColors = {
  async: { bg: "#e8f5f0", text: "#2A7D6F", label: "No Phone" },
  creative: { bg: "#f0ebfa", text: "#6d48aa", label: "Creative" },
  phone: { bg: "#fff3e0", text: "#c17f24", label: "Phone" },
  qa: { bg: "#fdecea", text: "#b83232", label: "QA / Consulting" },
};

export default function App() {
  const [step, setStep] = useState(0);
  const [serviceSelections, setServiceSelections] = useState({});
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [budget, setBudget] = useState("");
  const [customBudgetDetails, setCustomBudgetDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  // serviceSelections: { [id]: { hours: number, rate: number } }

  const toggleService = (service) => {
    setServiceSelections(prev => {
      if (prev[service.id]) {
        const next = { ...prev };
        delete next[service.id];
        return next;
      }
      return { ...prev, [service.id]: { hours: 1, rate: service.suggested } };
    });
  };

  const updateHours = (id, hours) => {
    const parsed = parseInt(hours);
    setServiceSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], hours: isNaN(parsed) ? "" : parsed }
    }));
  };

  const updateRate = (id, rate) => {
    setServiceSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], rate: parseFloat(rate) || 0 }
    }));
  };

  const toggleAvail = (slot) => {
    setAvailability(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const selectedServiceIds = Object.keys(serviceSelections).map(Number);
  const selectedServiceObjs = SERVICES.filter(s => selectedServiceIds.includes(s.id));

  const alaCarteTotal = selectedServiceObjs.reduce((sum, s) => {
    const sel = serviceSelections[s.id];
    const hours = parseFloat(sel.hours) || 0;
    return sum + (hours * sel.rate);
  }, 0);

  const suggestedPackage = PACKAGES.find(p =>
    p.range && alaCarteTotal >= p.range[0] && alaCarteTotal <= p.range[1]
  );

  const handleSubmit = () => setSubmitted(true);

  const summaryLines = selectedServiceObjs.map(s => {
    const sel = serviceSelections[s.id];
    return `${s.name} — ${sel.hours} hr(s) @ $${sel.rate}/hr = $${(sel.hours * sel.rate).toFixed(0)}`;
  });

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0faf7 0%, #e8f4f8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "2rem" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "3rem", maxWidth: "580px", width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(42,125,111,0.12)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
          <h2 style={{ color: "#2A7D6F", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Request Received!</h2>
          <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Thank you, <strong>{name || "there"}</strong>. I'll review your request and reach out{email ? <> to <strong>{email}</strong></> : ""} within 24–48 hours to schedule a free 15-minute discovery call.
          </p>
          <div style={{ background: "#f0faf7", borderRadius: "12px", padding: "1.2rem", textAlign: "left", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: "bold", color: "#2A7D6F", marginBottom: "0.8rem" }}>Your Request Summary</div>
            {selectedServiceObjs.length > 0 && (
              <div style={{ marginBottom: "0.8rem" }}>
                <div style={{ color: "#444", fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.4rem" }}>À La Carte Services:</div>
                {summaryLines.map((line, i) => <div key={i} style={{ color: "#555", fontSize: "0.85rem", marginBottom: "0.2rem" }}>• {line}</div>)}
                <div style={{ color: "#2A7D6F", fontWeight: "bold", marginTop: "0.5rem" }}>À La Carte Total: ${alaCarteTotal.toFixed(0)}</div>
              </div>
            )}
            {selectedPackage && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.3rem" }}>📦 Package: <strong>{PACKAGES.find(p => p.id === selectedPackage)?.name}</strong></div>}
            {budget && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.3rem" }}>💰 Budget: <strong>{budget}</strong></div>}
            {customBudgetDetails && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.3rem" }}>Details: {customBudgetDetails}</div>}
            {availability.length > 0 && <div style={{ color: "#555", fontSize: "0.88rem" }}>🕐 Availability: <strong>{availability.join(", ")}</strong></div>}
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); setServiceSelections({}); setSelectedPackage(null); setAvailability([]); setBudget(""); setCustomBudgetDetails(""); setName(""); setEmail(""); setPracticeName(""); setNotes(""); }}
            style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0faf7 0%, #e8f4f8 60%, #f5f0fa 100%)", fontFamily: "Georgia, serif" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a5c52 0%, #2A7D6F 60%, #3a9688 100%)", color: "white", padding: "3.5rem 2rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.85rem", letterSpacing: "0.2em", opacity: 0.8, marginBottom: "0.8rem", textTransform: "uppercase" }}>Licensed Mental Health Therapist</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "bold", margin: "0 0 0.8rem", lineHeight: 1.2 }}>Operational Support<br />for Busy Therapists</h1>
          <p style={{ opacity: 0.88, fontSize: "1.05rem", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            I'm a licensed therapist who gets it. The notes that follow you to bed, the admin that steals your Sundays, the Monday dread of being further behind than Friday. I offer flexible, non-clinical business support so you don't have to do it all alone. À la carte or bundled. Your clients get your full attention. Your inbox, your waitlist, your directories — those can be mine.
          </p>
          <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["🌙 Evenings & Weekends", "📋 Operational Support", "🔍 QA & Documentation Review", "💬 You Name the Budget"].map(tag => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.4rem 1rem", fontSize: "0.82rem" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Service Highlights Strip */}
      <div style={{ background: "white", borderBottom: "1px solid #e0f0ec", padding: "1.4rem 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", color: "#2A7D6F", fontWeight: "bold", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>What I Can Help With</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.7rem" }}>
            {[
              { icon: "🗂", title: "Operations & Admin", desc: "Inbox, EHR, intake, scheduling, insurance research" },
              { icon: "🔍", title: "QA & Documentation Audit", desc: "Peer review of notes, diagnoses, and treatment plans for completeness" },
              { icon: "💼", title: "Practice Consulting", desc: "Workflow design, system setup, and scaling strategy" },
              { icon: "📞", title: "Phone Tasks", desc: "Benefits verification, referral outreach calls" },
              { icon: "✍️", title: "Creative Services", desc: "Content writing, web copy, templates & onboarding kits" },
            ].map(item => (
              <div key={item.title} style={{ background: "#f8fffe", border: "1px solid #e0f0ec", borderRadius: "12px", padding: "0.8rem 1rem" }}>
                <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{item.icon}</div>
                <div style={{ fontWeight: "bold", color: "#2A7D6F", fontSize: "0.85rem", marginBottom: "0.2rem" }}>{item.title}</div>
                <div style={{ color: "#666", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: "white", borderBottom: "1px solid #e0f0ec", padding: "0 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex" }}>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i < step ? setStep(i) : null}
              style={{ flex: 1, padding: "1rem 0.5rem", border: "none", borderBottom: i === step ? "3px solid #2A7D6F" : "3px solid transparent", background: "none", cursor: i <= step ? "pointer" : "default", color: i === step ? "#2A7D6F" : i < step ? "#555" : "#aaa", fontFamily: "Georgia, serif", fontSize: "0.85rem", fontWeight: i === step ? "bold" : "normal", transition: "all 0.2s" }}>
              <span style={{ display: "block", fontSize: "1.1rem", marginBottom: "0.2rem" }}>{["🗂", "📦", "📅", "💰"][i]}</span>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem 4rem" }}>

        {/* STEP 0: Services */}
        {step === 0 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose À La Carte Services</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select the services you're interested in, set the number of hours, and accept the suggested rate or enter your own. You can also skip straight to packages on the next step.</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {[
                { val: "all", label: "All Services" },
                { val: "async", label: "No Phone" },
                { val: "qa", label: "QA & Consulting" },
                { val: "phone", label: "Phone Tasks" },
                { val: "creative", label: "Creative" },
              ].map(cat => (
                <button key={cat.val} onClick={() => setFilterCat(cat.val)}
                  style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "2px solid", borderColor: filterCat === cat.val ? "#2A7D6F" : "#ddd", background: filterCat === cat.val ? "#2A7D6F" : "white", color: filterCat === cat.val ? "white" : "#555", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.85rem", transition: "all 0.2s" }}>
                  {cat.label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gap: "0.8rem" }}>
              {SERVICES.filter(s => filterCat === "all" || s.category === filterCat).map(service => {
                const sel = serviceSelections[service.id];
                const isSelected = !!sel;
                const cc = categoryColors[service.category];
                return (
                  <div key={service.id}
                    style={{ background: isSelected ? "#f0faf7" : "white", border: `2px solid ${isSelected ? "#2A7D6F" : "#e8e8e8"}`, borderRadius: "14px", padding: "1rem 1.2rem", transition: "all 0.2s", boxShadow: isSelected ? "0 4px 16px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer" }} onClick={() => toggleService(service)}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "6px", border: `2px solid ${isSelected ? "#2A7D6F" : "#ccc"}`, background: isSelected ? "#2A7D6F" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.2s" }}>
                        {isSelected && <span style={{ color: "white", fontSize: "0.85rem" }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                          <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "0.95rem" }}>{service.name}</span>
                          <span style={{ background: cc.bg, color: cc.text, fontSize: "0.72rem", padding: "0.15rem 0.6rem", borderRadius: "999px", fontWeight: "bold", letterSpacing: "0.05em" }}>{cc.label}</span>
                        </div>
                        <div style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.4rem" }}>{service.desc}</div>
                        <div style={{ fontSize: "0.8rem", color: "#888" }}>⏰ {service.availability}</div>
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0f0ec", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <label style={{ fontSize: "0.82rem", color: "#555", fontWeight: "bold" }}>Hours:</label>
                          <input type="number" min="1" value={sel.hours}
                            onChange={e => updateHours(service.id, e.target.value)}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "60px", padding: "0.3rem 0.5rem", borderRadius: "6px", border: "2px solid #b8e0d8", fontFamily: "Georgia, serif", fontSize: "0.9rem", textAlign: "center" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <label style={{ fontSize: "0.82rem", color: "#555", fontWeight: "bold" }}>Rate ($/hr):</label>
                          <input type="number" min="0" value={sel.rate}
                            onChange={e => updateRate(service.id, e.target.value)}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "80px", padding: "0.3rem 0.5rem", borderRadius: "6px", border: "2px solid #b8e0d8", fontFamily: "Georgia, serif", fontSize: "0.9rem", textAlign: "center" }} />
                          <span style={{ fontSize: "0.78rem", color: "#888" }}>Suggested: ${service.suggested}/hr</span>
                        </div>
                        <div style={{ marginLeft: "auto", color: "#2A7D6F", fontWeight: "bold", fontSize: "0.95rem" }}>
                          Subtotal: ${(sel.hours * sel.rate).toFixed(0)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedServiceObjs.length > 0 && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "12px", padding: "1.2rem", marginTop: "1.5rem" }}>
                <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.6rem" }}>À La Carte Summary</div>
                {selectedServiceObjs.map(s => {
                  const sel = serviceSelections[s.id];
                  return (
                    <div key={s.id} style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      <span>{s.name} ({sel.hours} hr{sel.hours > 1 ? "s" : ""} @ ${sel.rate}/hr)</span>
                      <span style={{ fontWeight: "bold" }}>${(sel.hours * sel.rate).toFixed(0)}</span>
                    </div>
                  );
                })}
                <div style={{ borderTop: "1px solid #b8e0d8", marginTop: "0.8rem", paddingTop: "0.8rem", display: "flex", justifyContent: "space-between", fontWeight: "bold", color: "#2A7D6F", fontSize: "1rem" }}>
                  <span>Total</span>
                  <span>${alaCarteTotal.toFixed(0)}</span>
                </div>
                {suggestedPackage && (
                  <div style={{ marginTop: "0.8rem", background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "8px", padding: "0.7rem 0.9rem", fontSize: "0.82rem", color: "#6d4c00" }}>
                    💡 Your selections are close to the <strong>{suggestedPackage.name}</strong> package (${suggestedPackage.suggested}/mo). You may save with a package — review it on the next page!
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setStep(1)} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                Next: Packages →
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Packages */}
        {step === 1 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose a Package</h2>
            <p style={{ color: "#666", marginBottom: "0.6rem", lineHeight: 1.6 }}>Packages can be purchased as a one-time engagement or on a recurring monthly basis. You can combine a package with your à la carte selections, or choose one or the other.</p>

            {selectedServiceObjs.length > 0 && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "12px", padding: "1rem 1.2rem", marginBottom: "1.5rem" }}>
                <div style={{ color: "#2A7D6F", fontWeight: "bold", marginBottom: "0.4rem" }}>Your À La Carte Total: ${alaCarteTotal.toFixed(0)}</div>
                <div style={{ color: "#666", fontSize: "0.84rem" }}>{selectedServiceObjs.map(s => s.name).join(", ")}</div>
                {suggestedPackage && (
                  <div style={{ marginTop: "0.6rem", fontSize: "0.82rem", color: "#6d4c00", background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "6px", padding: "0.5rem 0.8rem" }}>
                    💡 Based on your selections, the <strong>{suggestedPackage.name}</strong> package at ${suggestedPackage.suggested}/mo may be a good fit.
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "grid", gap: "1rem" }}>
              {PACKAGES.map(pkg => {
                const sel = selectedPackage === pkg.id;
                const isSuggested = suggestedPackage && suggestedPackage.id === pkg.id;
                return (
                  <div key={pkg.id} onClick={() => setSelectedPackage(sel ? null : pkg.id)}
                    style={{ background: sel ? "#f0faf7" : "white", border: `2px solid ${sel ? "#2A7D6F" : isSuggested ? "#f0c040" : "#e8e8e8"}`, borderRadius: "16px", padding: "1.3rem 1.5rem", cursor: "pointer", transition: "all 0.2s", boxShadow: sel ? "0 4px 20px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    {isSuggested && !sel && <div style={{ fontSize: "0.75rem", color: "#b8860b", fontWeight: "bold", marginBottom: "0.4rem" }}>⭐ Recommended based on your selections</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "1.05rem" }}>{pkg.name}</span>
                          {pkg.hours && <span style={{ background: pkg.color, color: "#444", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>{pkg.hours} hrs</span>}
                          {pkg.id === "creative" && <span style={{ background: pkg.color, color: "#7a2070", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>From $65/hr</span>}
                          {pkg.hours && <span style={{ background: "#e8f5f0", color: "#2A7D6F", fontSize: "0.72rem", padding: "0.2rem 0.7rem", borderRadius: "999px" }}>One-time or monthly</span>}
                        </div>
                        <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.7rem" }}>{pkg.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {pkg.includes.map(item => (
                            <span key={item} style={{ background: "#f5f5f5", color: "#555", fontSize: "0.78rem", padding: "0.2rem 0.6rem", borderRadius: "6px" }}>✓ {item}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        {pkg.id === "creative" ? (
                          <div>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1.1rem" }}>$65+/hr</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>by project or hour</div>
                          </div>
                        ) : pkg.suggested ? (
                          <div>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1.4rem" }}>${pkg.suggested}</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>one-time or /mo</div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1rem" }}>You Decide</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>tell us what works</div>
                          </div>
                        )}
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `2px solid ${sel ? "#2A7D6F" : "#ccc"}`, background: sel ? "#2A7D6F" : "white", margin: "0.8rem auto 0", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                          {sel && <span style={{ color: "white", fontSize: "0.8rem" }}>✓</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedPackage === "custom" && (
              <div style={{ marginTop: "1rem", background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "12px", padding: "1.2rem" }}>
                <label style={{ display: "block", color: "#6d4c00", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.6rem" }}>Tell me about what you need or your budget — or note that you'd like to schedule a call to discuss:</label>
                <textarea value={customBudgetDetails} onChange={e => setCustomBudgetDetails(e.target.value)}
                  placeholder="Example: I need about 5 hours a month of inbox help and occasional content writing. My budget is around $300/mo. Or: I'd prefer to schedule a call to talk through options."
                  rows={4}
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ffe082", fontFamily: "Georgia, serif", fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box", background: "white" }} />
              </div>
            )}

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(0)} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Next: Schedule →</button>
            </div>
          </div>
        )}

        {/* STEP 2: Schedule */}
        {step === 2 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>When Do You Need Help?</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select a preferred time frame below — or skip this step and let me suggest what works best based on your services. No selection is required to move forward.</p>

            {[
              { label: "🌅 Early Mornings (5–8am)", value: "early-am", note: "Great for async tasks — ready before your day starts" },
              { label: "☀️ Daytime Hours", value: "daytime", note: "Best for phone tasks — available select hours by arrangement" },
              { label: "🌙 Evenings (6–10pm)", value: "evenings", note: "Ideal for async, writing, and data work" },
              { label: "📅 Weekends", value: "weekends", note: "Available Sat & Sun for flexible tasks" },
              { label: "🔄 Ongoing / Recurring", value: "recurring", note: "Same tasks on a regular weekly or monthly schedule" },
              { label: "🗓 Let me choose what works best", value: "flexible", note: "I'll reach out with available times that fit your services" },
            ].map(slot => {
              const sel = availability.includes(slot.value);
              return (
                <div key={slot.value} onClick={() => toggleAvail(slot.value)}
                  style={{ background: sel ? "#f0faf7" : "white", border: `2px solid ${sel ? "#2A7D6F" : "#e8e8e8"}`, borderRadius: "14px", padding: "1rem 1.2rem", cursor: "pointer", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${sel ? "#2A7D6F" : "#ccc"}`, background: sel ? "#2A7D6F" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {sel && <span style={{ color: "white", fontSize: "0.8rem" }}>✓</span>}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#2D2D2D", marginBottom: "0.2rem" }}>{slot.label}</div>
                    <div style={{ color: "#777", fontSize: "0.84rem" }}>{slot.note}</div>
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Next: Budget & Book →</button>
            </div>
          </div>
        )}

        {/* STEP 3: Budget & Book */}
        {step === 3 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Review & Submit</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Review your selections below and share your contact details. I'll follow up within 24–48 hours.</p>

            {/* Full Summary */}
            <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "14px", padding: "1.2rem 1.4rem", marginBottom: "1.8rem" }}>
              <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.8rem" }}>📋 Your Full Summary</div>

              {selectedServiceObjs.length > 0 && (
                <div style={{ marginBottom: "0.8rem" }}>
                  <div style={{ color: "#444", fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.4rem" }}>À La Carte Services:</div>
                  {selectedServiceObjs.map(s => {
                    const sel = serviceSelections[s.id];
                    return (
                      <div key={s.id} style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: "0.85rem", marginBottom: "0.2rem" }}>
                        <span>• {s.name} ({sel.hours} hr{sel.hours > 1 ? "s" : ""} @ ${sel.rate}/hr)</span>
                        <span style={{ fontWeight: "bold" }}>${(sel.hours * sel.rate).toFixed(0)}</span>
                      </div>
                    );
                  })}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", color: "#2A7D6F", fontSize: "0.95rem", marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #b8e0d8" }}>
                    <span>À La Carte Total</span>
                    <span>${alaCarteTotal.toFixed(0)}</span>
                  </div>
                </div>
              )}

              {selectedPackage && (
                <div style={{ marginBottom: "0.6rem" }}>
                  <div style={{ color: "#444", fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.3rem" }}>Package:</div>
                  <div style={{ color: "#555", fontSize: "0.88rem" }}>
                    {PACKAGES.find(p => p.id === selectedPackage)?.name}
                    {selectedPackage !== "custom" && PACKAGES.find(p => p.id === selectedPackage)?.suggested &&
                      <span style={{ color: "#2A7D6F", fontWeight: "bold" }}> — ${PACKAGES.find(p => p.id === selectedPackage)?.suggested} (one-time or /mo)</span>
                    }
                  </div>
                  {customBudgetDetails && <div style={{ color: "#666", fontSize: "0.83rem", marginTop: "0.3rem", fontStyle: "italic" }}>{customBudgetDetails}</div>}
                </div>
              )}

              {availability.length > 0 && (
                <div style={{ color: "#555", fontSize: "0.85rem" }}>
                  <span style={{ fontWeight: "bold", color: "#444" }}>Availability: </span>{availability.join(", ")}
                </div>
              )}
            </div>

            <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Your Name", value: name, set: setName, placeholder: "Dr. Sarah Johnson", type: "text" },
                { label: "Practice Name", value: practiceName, set: setPracticeName, placeholder: "Harmony Therapy Group", type: "text" },
                { label: "Email Address", value: email, set: setEmail, placeholder: "sarah@harmonytherapy.com", type: "email" },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>{field.label}</label>
                  <input type={field.type} value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder}
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.border = "2px solid #2A7D6F"}
                    onBlur={e => e.target.style.border = "2px solid #e0e0e0"}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Anything else I should know?</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Tell me about your practice, what's overwhelming you most, or any questions..." rows={4}
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", resize: "vertical", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.border = "2px solid #2A7D6F"}
                  onBlur={e => e.target.style.border = "2px solid #e0e0e0"}
                />
              </div>
            </div>

            <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "12px", padding: "1rem 1.2rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#6d4c00", lineHeight: 1.6 }}>
              <strong>🔒 A note on confidentiality:</strong> All services are non-clinical. A Business Associate Agreement (BAA) can be signed before any access to practice systems. Your information will never be shared.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={handleSubmit}
                style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                ✉️ Send My Request
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "center", color: "#999", fontSize: "0.82rem", lineHeight: 1.7, borderTop: "1px solid #e8e8e8", paddingTop: "1.5rem" }}>
          All services are operational support only. No direct client care, clinical decisions, or PHI access without a signed BAA.<br />
          Questions? Reach out directly to discuss — no obligation.
        </div>
      </div>
    </div>
  );
}
