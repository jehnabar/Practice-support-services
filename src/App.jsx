import { useState } from "react";

const SERVICES = [
  // Async / No Phone
  { id: 1, name: "Email Triage & Inbox Organization", desc: "Sort, label, draft responses to general inquiries, flag urgent items for you.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 30, unit: "hr", category: "async" },
  { id: 2, name: "EHR Data Entry & Form Input", desc: "Input demographics, insurance details, and intake forms into your system.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  { id: 3, name: "Intake Packet Review & Prep", desc: "Review completed paperwork and flag items before new client's first session.", format: "No phone", availability: "Early AM, Evenings", suggested: 32, unit: "hr", category: "async" },
  { id: 4, name: "Cancellation & Waitlist Management", desc: "Maintain your waitlist spreadsheet and track cancellations systematically.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  { id: 5, name: "Insurance Panel Research", desc: "Research open panels in your state and compile credentialing requirements. May require calls to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 38, unit: "hr", category: "phone" },
  { id: 6, name: "Referral & Resource Database", desc: "Build and maintain a spreadsheet of local psychiatrists, PCPs, schools, community resources. May require calls to local businesses to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 32, unit: "hr", category: "phone" },
  { id: 11, name: "Directory Listing Audit", desc: "Review Psychology Today, Headway, Alma, and other profiles for accuracy and optimization. Includes enrolling or adding your practice to new directories.", format: "No phone", availability: "Evenings, Weekends", suggested: 35, unit: "hr", category: "async" },
  { id: 12, name: "License Renewal & CE Tracking", desc: "Create tracker and monitor staff/intern license expiration, associate hour accruals or CE hours.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  // QA / Clinical Admin
  { id: 16, name: "Quality Assurance — Notes, Diagnoses & Treatment Plans", desc: "Peer review of clinical documentation for completeness, coding accuracy, and regulatory compliance. Includes auditing progress notes, diagnosis codes, and treatment plan structure. Non-supervisory; no clinical guidance provided.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "qa" },
  { id: 17, name: "Practice Consulting", desc: "Strategic operational consulting on workflow design, system selection, onboarding processes, and practice efficiency. Ideal for solo providers building systems or group practices scaling up.", format: "No phone", availability: "Flexible", suggested: 70, unit: "hr", category: "qa" },
  // Phone
  { id: 14, name: "Warm Referral Outreach Calls", desc: "Call referral sources and community partners on your behalf to share your availability.", format: "Phone required", availability: "Daytime", suggested: 50, unit: "hr", category: "phone" },
  { id: 15, name: "Insurance Benefits Verification Calls", desc: "Verify client benefits and document coverage details before intake.", format: "Phone required", availability: "Daytime", suggested: 42, unit: "hr", category: "phone" },
  // Creative
  { id: 7, name: "Content Writing", desc: "Newsletters, blog posts, and social media content for your practice — in your voice.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  { id: 8, name: "Website Copy Refresh", desc: "Update your About, Services, and FAQ pages with fresh, accurate language.", format: "No phone", availability: "Evenings, Weekends", suggested: 70, unit: "hr", category: "creative" },
  { id: 9, name: "Progress Note Sample Design", desc: "Craft customizable note samples aligned to your modalities (CBT, EMDR, etc.).", format: "No phone", availability: "Evenings, Weekends", suggested: 55, unit: "hr", category: "creative" },
  { id: 10, name: "SOP & Workflow Documentation", desc: "Document your workflows so your practice can run smoothly even when you step back.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  { id: 13, name: "New Client Onboarding Welcome Kit", desc: "Design a polished branded welcome packet experience for new clients.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  // Lifeline
  { id: 18, name: "\"Phone a Friend\" Lifeline", desc: "Sometimes you just need to talk it through so you can stop procrastinating. Should I charge the late cancellation fee this time? Is this rate increase too much? Now you have someone to bounce ideas with — a fellow clinician who gets it.", format: "Phone", availability: "Flexible", suggested: 50, unit: "hr", category: "qa" },
];

const PACKAGES = [
  { id: "starter", name: "Starter Relief", hours: 5, unit: "mo", desc: "Perfect for the solo practitioner who needs occasional help without commitment.", includes: ["Email triage", "EHR data entry", "1 task of your choice"], suggested: 225, color: "#d4edda" },
  { id: "steady", name: "Steady Support", hours: 10, unit: "mo", desc: "For the growing practice ready to reclaim their evenings and weekends.", includes: ["Inbox management", "Waitlist tracking", "Intake prep", "Insurance research"], suggested: 475, color: "#d1ecf1" },
  { id: "full", name: "Full Operations", hours: 20, unit: "mo", desc: "Comprehensive support for group practices or high-volume solo providers.", includes: ["All async tasks", "Phone tasks", "SOP documentation", "Monthly practice audit", "QA review"], suggested: 950, color: "#e2d9f3" },
  { id: "creative", name: "Creative Services", hours: null, unit: "project or hr", desc: "Dedicated creative support — content writing, web copy, templates, onboarding kits, and workflow docs.", includes: ["Content writing", "Website copy", "Note templates", "Onboarding kits", "SOP docs"], suggested: 65, color: "#fde8f5", minNote: "Starting at $65/hr" },
  { id: "custom", name: "Name Your Budget", hours: null, unit: "mo", desc: "You tell me what you need and what you can spend. We'll build something that works.", includes: ["Fully flexible scope", "Any combination of services", "No pressure, no minimums"], suggested: null, color: "#fff3cd" },
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
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleAvail = (slot) => {
    setAvailability(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const selectedServiceObjs = SERVICES.filter(s => selectedServices.includes(s.id));
  const suggestedTotal = selectedServiceObjs.reduce((sum, s) => sum + s.suggested, 0);

  const handleSubmit = async () => {
    const formData = {
      name,
      email,
      practiceName,
      budget,
      notes,
      selectedPackage: selectedPackage ? PACKAGES.find(p => p.id === selectedPackage)?.name : "None selected",
      selectedServices: selectedServiceObjs.map(s => s.name).join(", ") || "None selected",
      availability: availability.join(", ") || "Not specified",
    };

    try {
      await fetch("https://formspree.io/f/mdavzaoj", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Form submission error:", err);
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0faf7 0%, #e8f4f8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: "2rem" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "3rem", maxWidth: "540px", textAlign: "center", boxShadow: "0 20px 60px rgba(42,125,111,0.12)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
          <h2 style={{ color: "#2A7D6F", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Request Received!</h2>
          <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Thank you, <strong>{name}</strong>. I'll review your request and reach out to <strong>{email}</strong> within 24–48 hours to schedule a free 15-minute discovery call.
          </p>
          <div style={{ background: "#f0faf7", borderRadius: "12px", padding: "1.2rem", textAlign: "left", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: "bold", color: "#2A7D6F", marginBottom: "0.5rem" }}>Your Request Summary</div>
            {selectedPackage && <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>📦 Package: {PACKAGES.find(p => p.id === selectedPackage)?.name}</div>}
            {selectedServices.length > 0 && <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>✅ Services: {selectedServiceObjs.map(s => s.name).join(", ")}</div>}
            {budget && <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>💰 Budget: {budget}</div>}
            {availability.length > 0 && <div style={{ color: "#555", fontSize: "0.9rem" }}>🕐 Availability: {availability.join(", ")}</div>}
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); setSelectedServices([]); setSelectedPackage(null); setAvailability([]); setBudget(""); setName(""); setEmail(""); setPracticeName(""); setNotes(""); }}
            style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0faf7 0%, #e8f4f8 60%, #f5f0fa 100%)", fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a5c52 0%, #2A7D6F 60%, #3a9688 100%)", color: "white", padding: "3.5rem 2rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.85rem", letterSpacing: "0.2em", opacity: 0.8, marginBottom: "0.8rem", textTransform: "uppercase" }}>Licensed Mental Health Therapist</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "bold", margin: "0 0 0.8rem", lineHeight: 1.2 }}>Operational Support<br />for Busy Therapists</h1>
          <p style={{ opacity: 0.88, fontSize: "1.05rem", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            I'm a licensed therapist who gets it. The notes that follow you to bed, the admin that steals your Sundays, the Monday dread of being further behind than Friday. I offer flexible, non-clinical business support so you don't have to do it all alone. À la carte or bundled. Your clients get your full attention. Your inbox, your waitlist, your directories — those can be mine.
          </p>
          <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["🌙 Evenings & Weekends", "📋 No Clinical Tasks", "🔍 QA & Documentation Review", "💬 You Name the Budget"].map(tag => (
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
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose Services</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select any services you're interested in. You can pick individual tasks or jump to packages in the next step.</p>

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
                const sel = selectedServices.includes(service.id);
                const cc = categoryColors[service.category];
                return (
                  <div key={service.id} onClick={() => toggleService(service.id)}
                    style={{ background: sel ? "#f0faf7" : "white", border: `2px solid ${sel ? "#2A7D6F" : "#e8e8e8"}`, borderRadius: "14px", padding: "1rem 1.2rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: "1rem", boxShadow: sel ? "0 4px 16px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "6px", border: `2px solid ${sel ? "#2A7D6F" : "#ccc"}`, background: sel ? "#2A7D6F" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.2s" }}>
                      {sel && <span style={{ color: "white", fontSize: "0.85rem" }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                        <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "0.95rem" }}>{service.name}</span>
                        <span style={{ background: cc.bg, color: cc.text, fontSize: "0.72rem", padding: "0.15rem 0.6rem", borderRadius: "999px", fontWeight: "bold", letterSpacing: "0.05em" }}>{cc.label}</span>
                      </div>
                      <div style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.4rem" }}>{service.desc}</div>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#888" }}>
                        <span>⏰ {service.availability}</span>
                        <span style={{ color: "#2A7D6F", fontWeight: "bold" }}>Suggested: ${service.suggested}/hr</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedServices.length > 0 && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "12px", padding: "1rem 1.2rem", marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ color: "#2A7D6F", fontWeight: "bold" }}>{selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected</div>
                  <div style={{ color: "#555", fontSize: "0.85rem" }}>Combined suggested rate: ${suggestedTotal}/hr total</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setStep(1)} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                Next: Choose a Package →
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Packages */}
        {step === 1 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose a Package</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Packages offer consistency and savings. Creative services are available as a separate tier. Or go with "Name Your Budget" — there's no wrong answer.</p>

            <div style={{ display: "grid", gap: "1rem" }}>
              {PACKAGES.map(pkg => {
                const sel = selectedPackage === pkg.id;
                return (
                  <div key={pkg.id} onClick={() => setSelectedPackage(sel ? null : pkg.id)}
                    style={{ background: sel ? "#f0faf7" : "white", border: `2px solid ${sel ? "#2A7D6F" : "#e8e8e8"}`, borderRadius: "16px", padding: "1.3rem 1.5rem", cursor: "pointer", transition: "all 0.2s", boxShadow: sel ? "0 4px 20px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "1.05rem" }}>{pkg.name}</span>
                          {pkg.hours && <span style={{ background: pkg.color, color: "#444", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>{pkg.hours} hrs/mo</span>}
                          {pkg.id === "creative" && <span style={{ background: pkg.color, color: "#7a2070", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>From $65/hr</span>}
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
                          <>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1.1rem" }}>$65+/hr</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>by project or hour</div>
                          </>
                        ) : pkg.suggested ? (
                          <>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1.4rem" }}>${pkg.suggested}</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>suggested/mo</div>
                          </>
                        ) : (
                          <>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1rem" }}>You Decide</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>starting at $150/mo</div>
                          </>
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

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(0)} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Next: Availability →</button>
            </div>
          </div>
        )}

        {/* STEP 2: Schedule */}
        {step === 2 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>When Do You Need Help?</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select all that apply. I'm primarily available early mornings, evenings, and weekends — with some daytime hours by arrangement.</p>

            {[
              { label: "🌅 Early Mornings (5–8am)", value: "early-am", note: "Great for async tasks — ready before your day starts" },
              { label: "☀️ Daytime Hours", value: "daytime", note: "Select hours available — best for phone tasks" },
              { label: "🌙 Evenings (6–10pm)", value: "evenings", note: "Ideal for async, writing, and data work" },
              { label: "📅 Weekends", value: "weekends", note: "Available Sat & Sun for flexible tasks" },
              { label: "🔄 Ongoing / Recurring", value: "recurring", note: "Same tasks on a regular weekly or monthly schedule" },
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
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Name Your Budget & Book</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Tell me what you're working with and I'll propose a scope that fits. No pressure, no minimums.</p>

            {(selectedServices.length > 0 || selectedPackage) && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "14px", padding: "1.2rem 1.4rem", marginBottom: "1.8rem" }}>
                <div style={{ color: "#2A7D6F", fontWeight: "bold", marginBottom: "0.8rem" }}>📋 Your Selections</div>
                {selectedPackage && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.4rem" }}>📦 Package: <strong>{PACKAGES.find(p => p.id === selectedPackage)?.name}</strong></div>}
                {selectedServices.length > 0 && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.4rem" }}>✅ Services: <strong>{selectedServiceObjs.map(s => s.name).join(", ")}</strong></div>}
                {availability.length > 0 && <div style={{ color: "#555", fontSize: "0.88rem" }}>⏰ Availability: <strong>{availability.join(", ")}</strong></div>}
              </div>
            )}

            <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Your Name *", value: name, set: setName, placeholder: "Dr. Sarah Johnson", type: "text" },
                { label: "Practice Name", value: practiceName, set: setPracticeName, placeholder: "Harmony Therapy Group", type: "text" },
                { label: "Email Address *", value: email, set: setEmail, placeholder: "sarah@harmonytherapy.com", type: "email" },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>{field.label}</label>
                  <input type={field.type} value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder}
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                    onFocus={e => e.target.style.border = "2px solid #2A7D6F"}
                    onBlur={e => e.target.style.border = "2px solid #e0e0e0"}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Your Monthly Budget</label>
                <select value={budget} onChange={e => setBudget(e.target.value)}
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", background: "white", cursor: "pointer", boxSizing: "border-box" }}>
                  <option value="">I'd like to discuss this...</option>
                  <option value="under-225">Under $225/mo — Starter Relief level</option>
                  <option value="225-475">$225–$475/mo — Steady Support range</option>
                  <option value="475-950">$475–$950/mo — Full Operations range</option>
                  <option value="950+">$950+/mo — I need significant support</option>
                  <option value="creative">Creative services only (from $65/hr)</option>
                  <option value="project">One-time project (not monthly)</option>
                  <option value="flexible">Flexible — let's talk</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Anything else I should know?</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Tell me about your practice, what's overwhelming you most, or any special requirements..." rows={4}
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", resize: "vertical", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
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
              <button onClick={handleSubmit} disabled={!name || !email}
                style={{ background: name && email ? "#2A7D6F" : "#ccc", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: name && email ? "pointer" : "not-allowed", fontFamily: "Georgia, serif", fontWeight: "bold", transition: "background 0.2s" }}>
                ✉️ Send My Request
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "center", color: "#999", fontSize: "0.82rem", lineHeight: 1.7, borderTop: "1px solid #e8e8e8", paddingTop: "1.5rem" }}>
          All services are non-clinical operational support only. No direct client care, clinical decisions, or PHI access without a signed BAA.<br />
          Questions? Reach out directly to discuss — no obligation.
        </div>
      </div>
    </div>
  );
}
