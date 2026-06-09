import React from 'react'

const FORMSPREE_URL = "https://formspree.io/f/mdavzaoj";

const SERVICES = [
  { id: 1, name: "Email Triage & Inbox Organization", desc: "Sort, label, draft responses to general inquiries, flag urgent items for you.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 30, unit: "hr", category: "async" },
  { id: 2, name: "EHR Data Entry & Form Input", desc: "Input demographics, insurance details, and intake forms into your system.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  { id: 3, name: "Intake Packet Review & Prep", desc: "Review completed paperwork and flag items before new client's first session.", format: "No phone", availability: "Early AM, Evenings", suggested: 32, unit: "hr", category: "async" },
  { id: 4, name: "Cancellation & Waitlist Management", desc: "Maintain your waitlist spreadsheet and track cancellations systematically.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  { id: 5, name: "Insurance Panel Research", desc: "Research open panels in your state and compile credentialing requirements. May require calls to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 38, unit: "hr", category: "phone" },
  { id: 6, name: "Referral & Resource Database", desc: "Build and maintain a spreadsheet of local psychiatrists, PCPs, schools, community resources. May require calls to local businesses to verify information.", format: "Phone may be required", availability: "Daytime", suggested: 32, unit: "hr", category: "phone" },
  { id: 11, name: "Directory Listing Audit", desc: "Review Psychology Today, Headway, Alma, and other profiles for accuracy and optimization. Includes enrolling or adding your practice to new directories.", format: "No phone", availability: "Evenings, Weekends", suggested: 35, unit: "hr", category: "async" },
  { id: 12, name: "License Renewal & CE Tracking", desc: "Create tracker and monitor staff/intern license expiration, associate hour accruals or CE hours.", format: "No phone", availability: "Flexible", suggested: 30, unit: "hr", category: "async" },
  { id: 16, name: "Quality Assurance - Notes, Diagnoses & Treatment Plans", desc: "Peer review of clinical documentation for completeness, coding accuracy, and regulatory compliance. Includes auditing progress notes, diagnosis codes, and treatment plan structure. Non-supervisory; no clinical guidance provided.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "qa" },
  { id: 17, name: "Practice Consulting", desc: "Strategic operational consulting on workflow design, system selection, onboarding processes, and practice efficiency. Ideal for solo providers building systems or group practices scaling up.", format: "No phone", availability: "Flexible", suggested: 70, unit: "hr", category: "qa" },
  { id: 14, name: "Warm Referral Outreach Calls", desc: "Call referral sources and community partners on your behalf to share your availability.", format: "Phone required", availability: "Daytime", suggested: 50, unit: "hr", category: "phone" },
  { id: 15, name: "Insurance Benefits Verification Calls", desc: "Verify client benefits and document coverage details before intake.", format: "Phone required", availability: "Daytime", suggested: 42, unit: "hr", category: "phone" },
  { id: 7, name: "Content Writing", desc: "Newsletters, blog posts, and social media content for your practice in your voice.", format: "No phone", availability: "Early AM, Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  { id: 8, name: "Website Copy Refresh", desc: "Update your About, Services, and FAQ pages with fresh, accurate language.", format: "No phone", availability: "Evenings, Weekends", suggested: 70, unit: "hr", category: "creative" },
  { id: 9, name: "Progress Note Sample Design", desc: "Craft customizable note samples aligned to your modalities (CBT, EMDR, etc.).", format: "No phone", availability: "Evenings, Weekends", suggested: 55, unit: "hr", category: "creative" },
  { id: 10, name: "SOP & Workflow Documentation", desc: "Document your workflows so your practice can run smoothly even when you step back.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  { id: 13, name: "New Client Onboarding Welcome Kit", desc: "Design a polished branded welcome packet experience for new clients.", format: "No phone", availability: "Evenings, Weekends", suggested: 65, unit: "hr", category: "creative" },
  { id: 18, name: "Phone a Friend Lifeline", desc: "Sometimes you just need to talk it through so you can stop procrastinating. Should I charge the late cancellation fee this time? Is this rate increase too much? Now you have someone to bounce ideas with - a fellow clinician who gets it.", format: "Phone", availability: "Flexible", suggested: 50, unit: "hr", category: "qa" },
];

const PACKAGES = [
  { id: "starter", name: "Starter Relief", hours: 5, unit: "mo", desc: "Perfect for the solo practitioner who needs occasional help without commitment.", includes: ["Email triage", "EHR data entry", "1 task of your choice"], suggested: 225, color: "#d4edda" },
  { id: "steady", name: "Steady Support", hours: 10, unit: "mo", desc: "For the growing practice ready to reclaim their evenings and weekends.", includes: ["Inbox management", "Waitlist tracking", "Intake prep", "Insurance research"], suggested: 475, color: "#d1ecf1" },
  { id: "full", name: "Full Operations", hours: 20, unit: "mo", desc: "Comprehensive support for group practices or high-volume solo providers.", includes: ["All async tasks", "Phone tasks", "SOP documentation", "Monthly practice audit", "QA review"], suggested: 950, color: "#e2d9f3" },
  { id: "creative", name: "Creative Services", hours: null, unit: "project or hr", desc: "Dedicated creative support - content writing, web copy, templates, onboarding kits, and workflow docs.", includes: ["Content writing", "Website copy", "Note templates", "Onboarding kits", "SOP docs"], suggested: 65, color: "#fde8f5" },
  { id: "custom", name: "Name Your Budget", hours: null, unit: "mo", desc: "You tell me what you need and what you can spend. We will build something that works.", includes: ["Fully flexible scope", "Any combination of services", "No pressure, no minimums"], suggested: null, color: "#fff3cd" },
];

const STEPS = ["Services", "Package", "Schedule", "Budget & Book"];

const categoryColors = {
  async: { bg: "#e8f5f0", text: "#2A7D6F", label: "No Phone" },
  creative: { bg: "#f0ebfa", text: "#6d48aa", label: "Creative" },
  phone: { bg: "#fff3e0", text: "#c17f24", label: "Phone" },
  qa: { bg: "#fdecea", text: "#b83232", label: "QA / Consulting" },
};

export default function App() {
  var stepState = useState(0);
  var step = stepState[0];
  var setStep = stepState[1];

  var selectedServicesState = useState([]);
  var selectedServices = selectedServicesState[0];
  var setSelectedServices = selectedServicesState[1];

  var selectedPackageState = useState(null);
  var selectedPackage = selectedPackageState[0];
  var setSelectedPackage = selectedPackageState[1];

  var availabilityState = useState([]);
  var availability = availabilityState[0];
  var setAvailability = availabilityState[1];

  var budgetState = useState("");
  var budget = budgetState[0];
  var setBudget = budgetState[1];

  var nameState = useState("");
  var name = nameState[0];
  var setName = nameState[1];

  var emailState = useState("");
  var email = emailState[0];
  var setEmail = emailState[1];

  var practiceNameState = useState("");
  var practiceName = practiceNameState[0];
  var setPracticeName = practiceNameState[1];

  var notesState = useState("");
  var notes = notesState[0];
  var setNotes = notesState[1];

  var submittedState = useState(false);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];

  var filterCatState = useState("all");
  var filterCat = filterCatState[0];
  var setFilterCat = filterCatState[1];

  var loadingState = useState(false);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  function toggleService(id) {
    setSelectedServices(function(prev) {
      if (prev.includes(id)) {
        return prev.filter(function(s) { return s !== id; });
      }
      return prev.concat([id]);
    });
  }

  function toggleAvail(slot) {
    setAvailability(function(prev) {
      if (prev.includes(slot)) {
        return prev.filter(function(s) { return s !== slot; });
      }
      return prev.concat([slot]);
    });
  }

  var selectedServiceObjs = SERVICES.filter(function(s) { return selectedServices.includes(s.id); });
  var suggestedTotal = selectedServiceObjs.reduce(function(sum, s) { return sum + s.suggested; }, 0);

  var pkgName = "None selected";
  if (selectedPackage) {
    var foundPkg = PACKAGES.find(function(p) { return p.id === selectedPackage; });
    if (foundPkg) pkgName = foundPkg.name;
  }

  function handleSubmit() {
    setLoading(true);
    var payload = {
      name: name,
      email: email,
      "practice-name": practiceName,
      budget: budget,
      notes: notes,
      package: pkgName,
      services: selectedServiceObjs.map(function(s) { return s.name; }).join(", ") || "None selected",
      availability: availability.join(", ") || "Not specified",
    };

    fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    }).then(function() {
      setLoading(false);
      setSubmitted(true);
    }).catch(function() {
      setLoading(false);
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0faf7 0%, #e8f4f8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "2rem" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "3rem", maxWidth: "540px", textAlign: "center", boxShadow: "0 20px 60px rgba(42,125,111,0.12)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
          <h2 style={{ color: "#2A7D6F", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Request Received!</h2>
          <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Thank you, <strong>{name}</strong>. I will review your request and reach out to <strong>{email}</strong> within 24-48 hours to schedule a free 15-minute discovery call.
          </p>
          <div style={{ background: "#f0faf7", borderRadius: "12px", padding: "1.2rem", textAlign: "left", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: "bold", color: "#2A7D6F", marginBottom: "0.5rem" }}>Your Request Summary</div>
            <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>Package: {pkgName}</div>
            <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>Services: {selectedServiceObjs.map(function(s) { return s.name; }).join(", ") || "None selected"}</div>
            {budget ? <div style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.3rem" }}>Budget: {budget}</div> : null}
            {availability.length > 0 ? <div style={{ color: "#555", fontSize: "0.9rem" }}>Availability: {availability.join(", ")}</div> : null}
          </div>
          <button onClick={function() { setSubmitted(false); setStep(0); setSelectedServices([]); setSelectedPackage(null); setAvailability([]); setBudget(""); setName(""); setEmail(""); setPracticeName(""); setNotes(""); }}
            style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.8rem 2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0faf7 0%, #e8f4f8 60%, #f5f0fa 100%)", fontFamily: "Georgia, serif" }}>

      <div style={{ background: "linear-gradient(135deg, #1a5c52 0%, #2A7D6F 60%, #3a9688 100%)", color: "white", padding: "3.5rem 2rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.85rem", letterSpacing: "0.2em", opacity: 0.8, marginBottom: "0.8rem", textTransform: "uppercase" }}>Licensed Mental Health Therapist</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "bold", margin: "0 0 0.8rem", lineHeight: 1.2 }}>Operational Support<br />for Busy Therapists</h1>
          <p style={{ opacity: 0.88, fontSize: "1.05rem", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            I'm a licensed therapist who gets it. The notes that follow you to bed, the admin that steals your Sundays, the Monday dread of being further behind than Friday. I offer flexible, non-clinical business support so you don't have to do it all alone. A la carte or bundled. Your clients get your full attention. Your inbox, your waitlist, your directories - those can be mine.
          </p>
          <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["Evenings & Weekends", "No Clinical Tasks", "QA & Documentation Review", "You Name the Budget"].map(function(tag) {
              return <span key={tag} style={{ background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.4rem 1rem", fontSize: "0.82rem" }}>{tag}</span>;
            })}
          </div>
        </div>
      </div>

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
            ].map(function(item) {
              return (
                <div key={item.title} style={{ background: "#f8fffe", border: "1px solid #e0f0ec", borderRadius: "12px", padding: "0.8rem 1rem" }}>
                  <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{item.icon}</div>
                  <div style={{ fontWeight: "bold", color: "#2A7D6F", fontSize: "0.85rem", marginBottom: "0.2rem" }}>{item.title}</div>
                  <div style={{ color: "#666", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ background: "white", borderBottom: "1px solid #e0f0ec", padding: "0 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex" }}>
          {STEPS.map(function(s, i) {
            return (
              <button key={s} onClick={function() { if (i < step) setStep(i); }}
                style={{ flex: 1, padding: "1rem 0.5rem", border: "none", borderBottom: i === step ? "3px solid #2A7D6F" : "3px solid transparent", background: "none", cursor: i <= step ? "pointer" : "default", color: i === step ? "#2A7D6F" : i < step ? "#555" : "#aaa", fontFamily: "Georgia, serif", fontSize: "0.85rem", fontWeight: i === step ? "bold" : "normal" }}>
                <span style={{ display: "block", fontSize: "1.1rem", marginBottom: "0.2rem" }}>{["🗂", "📦", "📅", "💰"][i]}</span>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem 4rem" }}>

        {step === 0 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose Services</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select any services you are interested in. You can pick individual tasks or jump to packages in the next step.</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {[
                { val: "all", label: "All Services" },
                { val: "async", label: "No Phone" },
                { val: "qa", label: "QA & Consulting" },
                { val: "phone", label: "Phone Tasks" },
                { val: "creative", label: "Creative" },
              ].map(function(cat) {
                return (
                  <button key={cat.val} onClick={function() { setFilterCat(cat.val); }}
                    style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "2px solid", borderColor: filterCat === cat.val ? "#2A7D6F" : "#ddd", background: filterCat === cat.val ? "#2A7D6F" : "white", color: filterCat === cat.val ? "white" : "#555", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.85rem" }}>
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "grid", gap: "0.8rem" }}>
              {SERVICES.filter(function(s) { return filterCat === "all" || s.category === filterCat; }).map(function(service) {
                var sel = selectedServices.includes(service.id);
                var cc = categoryColors[service.category];
                return (
                  <div key={service.id} onClick={function() { toggleService(service.id); }}
                    style={{ background: sel ? "#f0faf7" : "white", border: "2px solid " + (sel ? "#2A7D6F" : "#e8e8e8"), borderRadius: "14px", padding: "1rem 1.2rem", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "1rem", boxShadow: sel ? "0 4px 16px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "6px", border: "2px solid " + (sel ? "#2A7D6F" : "#ccc"), background: sel ? "#2A7D6F" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {sel && <span style={{ color: "white", fontSize: "0.85rem" }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                        <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "0.95rem" }}>{service.name}</span>
                        <span style={{ background: cc.bg, color: cc.text, fontSize: "0.72rem", padding: "0.15rem 0.6rem", borderRadius: "999px", fontWeight: "bold" }}>{cc.label}</span>
                      </div>
                      <div style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.4rem" }}>{service.desc}</div>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#888" }}>
                        <span>{service.availability}</span>
                        <span style={{ color: "#2A7D6F", fontWeight: "bold" }}>Suggested: ${service.suggested}/hr</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedServices.length > 0 && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "12px", padding: "1rem 1.2rem", marginTop: "1.5rem" }}>
                <div style={{ color: "#2A7D6F", fontWeight: "bold" }}>{selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected</div>
                <div style={{ color: "#555", fontSize: "0.85rem" }}>Combined suggested rate: ${suggestedTotal}/hr</div>
              </div>
            )}

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={function() { setStep(1); }} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                Next: Choose a Package
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Choose a Package</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Packages offer consistency and savings. Creative services are available as a separate tier. Or go with Name Your Budget.</p>

            <div style={{ display: "grid", gap: "1rem" }}>
              {PACKAGES.map(function(pkg) {
                var sel = selectedPackage === pkg.id;
                return (
                  <div key={pkg.id} onClick={function() { setSelectedPackage(sel ? null : pkg.id); }}
                    style={{ background: sel ? "#f0faf7" : "white", border: "2px solid " + (sel ? "#2A7D6F" : "#e8e8e8"), borderRadius: "16px", padding: "1.3rem 1.5rem", cursor: "pointer", boxShadow: sel ? "0 4px 20px rgba(42,125,111,0.12)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "bold", color: "#2D2D2D", fontSize: "1.05rem" }}>{pkg.name}</span>
                          {pkg.hours && <span style={{ background: pkg.color, color: "#444", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>{pkg.hours} hrs/mo</span>}
                          {pkg.id === "creative" && <span style={{ background: pkg.color, color: "#7a2070", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "999px", fontWeight: "bold" }}>From $65/hr</span>}
                        </div>
                        <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.7rem" }}>{pkg.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {pkg.includes.map(function(item) {
                            return <span key={item} style={{ background: "#f5f5f5", color: "#555", fontSize: "0.78rem", padding: "0.2rem 0.6rem", borderRadius: "6px" }}>✓ {item}</span>;
                          })}
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
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>suggested/mo</div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ color: "#2A7D6F", fontWeight: "bold", fontSize: "1rem" }}>You Decide</div>
                            <div style={{ color: "#888", fontSize: "0.78rem" }}>starting at $150/mo</div>
                          </div>
                        )}
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid " + (sel ? "#2A7D6F" : "#ccc"), background: sel ? "#2A7D6F" : "white", margin: "0.8rem auto 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {sel && <span style={{ color: "white", fontSize: "0.8rem" }}>✓</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
              <button onClick={function() { setStep(0); }} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>Back</button>
              <button onClick={function() { setStep(2); }} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Next: Availability</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>When Do You Need Help?</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Select all that apply. I am primarily available early mornings, evenings, and weekends with some daytime hours by arrangement.</p>

            {[
              { label: "Early Mornings (5-8am)", value: "early-am", note: "Great for async tasks - ready before your day starts" },
              { label: "Daytime Hours", value: "daytime", note: "Select hours available - best for phone tasks" },
              { label: "Evenings (6-10pm)", value: "evenings", note: "Ideal for async, writing, and data work" },
              { label: "Weekends", value: "weekends", note: "Available Sat & Sun for flexible tasks" },
              { label: "Ongoing / Recurring", value: "recurring", note: "Same tasks on a regular weekly or monthly schedule" },
            ].map(function(slot) {
              var sel = availability.includes(slot.value);
              return (
                <div key={slot.value} onClick={function() { toggleAvail(slot.value); }}
                  style={{ background: sel ? "#f0faf7" : "white", border: "2px solid " + (sel ? "#2A7D6F" : "#e8e8e8"), borderRadius: "14px", padding: "1rem 1.2rem", cursor: "pointer", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "6px", border: "2px solid " + (sel ? "#2A7D6F" : "#ccc"), background: sel ? "#2A7D6F" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
              <button onClick={function() { setStep(1); }} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>Back</button>
              <button onClick={function() { setStep(3); }} style={{ background: "#2A7D6F", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Next: Budget & Book</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ color: "#2A7D6F", marginBottom: "0.4rem" }}>Name Your Budget & Book</h2>
            <p style={{ color: "#666", marginBottom: "1.5rem", lineHeight: 1.6 }}>Tell me what you are working with and I will propose a scope that fits. No pressure, no minimums.</p>

            {(selectedServices.length > 0 || selectedPackage) && (
              <div style={{ background: "#f0faf7", border: "1px solid #b8e0d8", borderRadius: "14px", padding: "1.2rem 1.4rem", marginBottom: "1.8rem" }}>
                <div style={{ color: "#2A7D6F", fontWeight: "bold", marginBottom: "0.8rem" }}>Your Selections</div>
                <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Package: <strong>{pkgName}</strong></div>
                {selectedServices.length > 0 && <div style={{ color: "#555", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Services: <strong>{selectedServiceObjs.map(function(s) { return s.name; }).join(", ")}</strong></div>}
                {availability.length > 0 && <div style={{ color: "#555", fontSize: "0.88rem" }}>Availability: <strong>{availability.join(", ")}</strong></div>}
              </div>
            )}

            <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Your Name *</label>
                <input type="text" value={name} onChange={function(e) { setName(e.target.value); }} placeholder="Dr. Sarah Johnson"
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Practice Name</label>
                <input type="text" value={practiceName} onChange={function(e) { setPracticeName(e.target.value); }} placeholder="Harmony Therapy Group"
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Email Address *</label>
                <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }} placeholder="sarah@harmonytherapy.com"
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Your Monthly Budget</label>
                <select value={budget} onChange={function(e) { setBudget(e.target.value); }}
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", background: "white", cursor: "pointer", boxSizing: "border-box" }}>
                  <option value="">I would like to discuss this...</option>
                  <option value="under-225">Under $225/mo - Starter Relief level</option>
                  <option value="225-475">$225-$475/mo - Steady Support range</option>
                  <option value="475-950">$475-$950/mo - Full Operations range</option>
                  <option value="950+">$950+/mo - I need significant support</option>
                  <option value="creative">Creative services only (from $65/hr)</option>
                  <option value="project">One-time project (not monthly)</option>
                  <option value="flexible">Flexible - lets talk</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: "#444", fontWeight: "bold", fontSize: "0.88rem", marginBottom: "0.4rem" }}>Anything else I should know?</label>
                <textarea value={notes} onChange={function(e) { setNotes(e.target.value); }} placeholder="Tell me about your practice, what is overwhelming you most, or any special requirements..." rows={4}
                  style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontFamily: "Georgia, serif", fontSize: "0.95rem", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "12px", padding: "1rem 1.2rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#6d4c00", lineHeight: 1.6 }}>
              <strong>A note on confidentiality:</strong> All services are non-clinical. A Business Associate Agreement (BAA) can be signed before any access to practice systems. Your information will never be shared.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={function() { setStep(2); }} style={{ background: "white", color: "#2A7D6F", border: "2px solid #2A7D6F", borderRadius: "12px", padding: "0.9rem 1.8rem", fontSize: "1rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>Back</button>
              <button onClick={handleSubmit} disabled={!name || !email || loading}
                style={{ background: name && email && !loading ? "#2A7D6F" : "#aaa", color: "white", border: "none", borderRadius: "12px", padding: "0.9rem 2.2rem", fontSize: "1rem", cursor: name && email && !loading ? "pointer" : "not-allowed", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                {loading ? "Sending..." : "Send My Request"}
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "center", color: "#999", fontSize: "0.82rem", lineHeight: 1.7, borderTop: "1px solid #e8e8e8", paddingTop: "1.5rem" }}>
          All services are non-clinical operational support only. No direct client care, clinical decisions, or PHI access without a signed BAA.
          Questions? Reach out directly to discuss - no obligation.
        </div>
      </div>
    </div>
  );
}
