'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<any>(null);
  const [cvCount, setCvCount] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', job: '', exp: '', skills: '', edu: '', photo: ''
  });

  useEffect(() => {
    setCvCount(parseInt(localStorage.getItem('cv_count') || '0'));
  }, []);

  const t: any = {
    fr: {
      title: 'Votre CV professionnel', subtitle: 'généré par IA en 30 secondes',
      sub: 'Rejoignez 10 000+ professionnels qui ont boosté leur carrière',
      btn: "Générer mon CV gratuitement", btn2: "Obtenir un nouveau CV — 2,99€",
      name: 'Prénom & Nom', email: 'Adresse email', phone: 'Téléphone',
      job: 'Poste visé', exp: 'Expériences professionnelles',
      skills: 'Compétences clés', edu: 'Formation & Diplômes',
      free: 'Premier CV 100% gratuit', generating: 'Génération en cours...',
      download: 'Télécharger mon CV en PDF',
      badge1: 'IA Avancée', badge2: 'PDF Professionnel', badge3: 'Bilingue FR/EN',
      section_profile: 'Profil', section_exp: 'Expériences', section_skills: 'Compétences', section_edu: 'Formation',
      photo_label: 'Photo de profil', photo_btn: 'Choisir une photo', photo_hint: 'JPG, PNG recommandé'
    },
    en: {
      title: 'Your professional CV', subtitle: 'AI-generated in 30 seconds',
      sub: 'Join 10,000+ professionals who boosted their career',
      btn: "Generate my CV for free", btn2: "Get a new CV — €2.99",
      name: 'Full Name', email: 'Email address', phone: 'Phone',
      job: 'Target Position', exp: 'Work Experience',
      skills: 'Key Skills', edu: 'Education & Degrees',
      free: 'First CV 100% free', generating: 'Generating...',
      download: 'Download my CV as PDF',
      badge1: 'Advanced AI', badge2: 'Professional PDF', badge3: 'Bilingual FR/EN',
      section_profile: 'Profile', section_exp: 'Experience', section_skills: 'Skills', section_edu: 'Education',
      photo_label: 'Profile photo', photo_btn: 'Choose a photo', photo_hint: 'JPG, PNG recommended'
    }
  }[lang];

  const generate = async () => {
    if (!form.name || !form.job) return alert(lang === 'fr' ? 'Remplis ton nom et le poste visé !' : 'Fill in your name and target position!');
    if (cvCount >= 1) {
      window.open('https://cvrapide.lemonsqueezy.com/checkout/buy/0f457762-70dc-4460-bf95-4c7dc6ff8661', '_blank');
      return;
    }
    setLoading(true);
    setCv(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang })
      });
      const data = await res.json();
      setCv(data);
      const newCount = cvCount + 1;
      localStorage.setItem('cv_count', newCount.toString());
      setCvCount(newCount);
    } catch (e) {
      alert('Erreur, réessaie.');
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${form.name}</title>
          <meta charset="utf-8"/>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: white; }
            .page { display: flex; min-height: 100vh; }
            .sidebar { width: 260px; min-width: 260px; background: #0f172a; color: white; padding: 40px 24px; display: flex; flex-direction: column; }
            .main { flex: 1; padding: 44px 40px; background: white; }
            .avatar { width: 90px; height: 90px; border-radius: 50%; overflow: hidden; margin: 0 auto 18px; border: 3px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #3b82f6, #6366f1); font-size: 34px; font-weight: 800; color: white; }
            .avatar img { width: 100%; height: 100%; object-fit: cover; }
            .sidebar-name { font-size: 18px; font-weight: 800; text-align: center; color: white; margin-bottom: 4px; line-height: 1.3; }
            .sidebar-job { font-size: 12px; color: #93c5fd; text-align: center; margin-bottom: 30px; font-weight: 500; }
            .sidebar-divider { height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 24px; }
            .sidebar-section { margin-bottom: 24px; }
            .sidebar-label { font-size: 9px; text-transform: uppercase; letter-spacing: 3px; color: #60a5fa; margin-bottom: 12px; font-weight: 700; }
            .sidebar-item { font-size: 12px; color: #cbd5e1; margin-bottom: 8px; line-height: 1.5; display: flex; align-items: flex-start; gap: 8px; }
            .sidebar-dot { color: #3b82f6; flex-shrink: 0; }
            .main-name { font-size: 36px; font-weight: 800; color: #0f172a; letter-spacing: -1px; line-height: 1.1; }
            .main-job { font-size: 16px; color: #3b82f6; font-weight: 600; margin-top: 6px; }
            .accent-line { width: 50px; height: 4px; background: linear-gradient(to right, #3b82f6, #6366f1); border-radius: 2px; margin: 14px 0 20px; }
            .main-contact { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
            .main-contact-item { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 6px; background: #f8fafc; padding: 5px 12px; border-radius: 20px; border: 1px solid #e2e8f0; }
            .section { margin-bottom: 28px; }
            .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
            .section-bar { width: 4px; height: 22px; background: linear-gradient(to bottom, #3b82f6, #6366f1); border-radius: 2px; flex-shrink: 0; }
            .section-title { font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 2px; }
            .section-text { font-size: 13px; line-height: 1.9; color: #475569; white-space: pre-line; padding: 14px 16px; background: #f8fafc; border-radius: 10px; border-left: 3px solid #e2e8f0; }
            .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill-pill { background: #eff6ff; color: #1d4ed8; font-size: 11px; padding: 5px 14px; border-radius: 20px; border: 1px solid #bfdbfe; font-weight: 600; }
            .footer { margin-top: auto; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 10px; color: #94a3b8; text-align: right; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="sidebar">
              <div class="avatar">
                ${form.photo ? `<img src="${form.photo}" />` : form.name.charAt(0).toUpperCase()}
              </div>
              <div class="sidebar-name">${form.name}</div>
              <div class="sidebar-job">${form.job}</div>
              <div class="sidebar-divider"></div>
              ${form.email || form.phone ? `
              <div class="sidebar-section">
                <div class="sidebar-label">Contact</div>
                ${form.email ? `<div class="sidebar-item"><span class="sidebar-dot">✉</span>${form.email}</div>` : ''}
                ${form.phone ? `<div class="sidebar-item"><span class="sidebar-dot">☎</span>${form.phone}</div>` : ''}
              </div>` : ''}
              ${cv.skills ? `
              <div class="sidebar-section">
                <div class="sidebar-label">Compétences</div>
                ${cv.skills.split(',').map((s: string) => `<div class="sidebar-item"><span class="sidebar-dot">▸</span>${s.trim()}</div>`).join('')}
              </div>` : ''}
              ${cv.education ? `
              <div class="sidebar-section">
                <div class="sidebar-label">Formation</div>
                <div class="sidebar-item"><span class="sidebar-dot">▸</span>${cv.education}</div>
              </div>` : ''}
              <div style="margin-top: auto; padding-top: 30px;">
                <div style="font-size: 9px; color: #334155; text-align: center; opacity: 0.5;">CVRapide.fr</div>
              </div>
            </div>
            <div class="main">
              <div class="main-name">${form.name}</div>
              <div class="main-job">${form.job}</div>
              <div class="accent-line"></div>
              <div class="main-contact">
                ${form.email ? `<span class="main-contact-item">✉ ${form.email}</span>` : ''}
                ${form.phone ? `<span class="main-contact-item">☎ ${form.phone}</span>` : ''}
              </div>
              ${cv.profile ? `
              <div class="section">
                <div class="section-header"><div class="section-bar"></div><div class="section-title">Profil Professionnel</div></div>
                <div class="section-text">${cv.profile}</div>
              </div>` : ''}
              ${cv.experience ? `
              <div class="section">
                <div class="section-header"><div class="section-bar"></div><div class="section-title">Expériences</div></div>
                <div class="section-text">${cv.experience}</div>
              </div>` : ''}
              ${cv.skills ? `
              <div class="section">
                <div class="section-header"><div class="section-bar"></div><div class="section-title">Compétences</div></div>
                <div class="skills-wrap">
                  ${cv.skills.split(',').map((s: string) => `<span class="skill-pill">${s.trim()}</span>`).join('')}
                </div>
              </div>` : ''}
              <div class="footer">Généré par CVRapide.fr — Intelligence Artificielle</div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 800);
  };

  const inputClass = "w-full mt-1.5 px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm";
  const textareaClass = "w-full mt-1.5 px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm resize-none";

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%)'}}>

      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">CV</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">CVRapide</span>
          </div>
          <div className="flex gap-2">
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${lang === l ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {l === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-14">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            {t.free}
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-2">
            {t.title}<br/>
            <span className="text-blue-600">{t.subtitle}</span>
          </h1>
          <p className="text-gray-500 text-lg mt-4 mb-8">{t.sub}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[t.badge1, t.badge2, t.badge3].map((b: string) => (
              <span key={b} className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full shadow-sm">✓ {b}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Vos informations</h2>

          {/* Photo upload */}
          <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-2xl border border-gray-200 mb-5">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-200">
              {form.photo ? (
                <img src={form.photo} alt="photo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-1">{t.photo_label}</p>
              <label className="cursor-pointer bg-blue-600 text-white text-xs px-4 py-2 rounded-xl hover:bg-blue-700 transition inline-block">
                {t.photo_btn}
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setForm({...form, photo: reader.result as string});
                  reader.readAsDataURL(file);
                }} />
              </label>
              <p className="text-xs text-gray-400 mt-1">{t.photo_hint}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {([['name', t.name, 'ex: Ahmed Benali'], ['job', t.job, 'ex: Développeur Web'], ['email', t.email, 'ahmed@email.com'], ['phone', t.phone, '+33 6 00 00 00 00']] as [string, string, string][]).map(([key, label, ph]) => (
              <div key={key}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
                <input value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})}
                  placeholder={ph} className={inputClass} />
              </div>
            ))}
            {([['exp', t.exp, 'ex: 2 ans chez Amazon en tant que préparateur de commandes...'], ['skills', t.skills, 'ex: Python, Excel, permis B, anglais courant...'], ['edu', t.edu, "ex: Bac+2 Informatique, Université d'Orléans 2022"]] as [string, string, string][]).map(([key, label, ph]) => (
              <div key={key} className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
                <textarea value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})}
                  placeholder={ph} rows={key === 'exp' ? 3 : 2} className={textareaClass} />
              </div>
            ))}
          </div>

          {cvCount >= 1 && (
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-amber-900 text-sm">🔒 CV gratuit déjà utilisé</p>
                <p className="text-amber-700 text-xs mt-1">Générez un nouveau CV professionnel pour seulement 2,99€</p>
              </div>
              <span className="text-2xl font-extrabold text-amber-600 whitespace-nowrap">2,99€</span>
            </div>
          )}

          <button onClick={generate} disabled={loading}
            className={`w-full mt-5 py-4 rounded-2xl font-bold text-base transition shadow-lg active:scale-95 ${cvCount >= 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-200' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200'} disabled:opacity-60 disabled:cursor-not-allowed`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {t.generating}
              </span>
            ) : cvCount >= 1 ? `🔓 ${t.btn2}` : `✨ ${t.btn}`}
          </button>
        </div>

        {/* CV Output */}
        {cv && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)'}} className="px-10 py-10 text-white">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/20">
                  {form.photo ? (
                    <img src={form.photo} alt="photo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold" style={{background: 'rgba(255,255,255,0.15)'}}>
                      {form.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold">{form.name}</h2>
                  <p className="text-blue-200 font-semibold mt-1 text-lg">{form.job}</p>
                  <div className="flex gap-5 mt-2">
                    {form.email && <span className="text-blue-300 text-sm">✉ {form.email}</span>}
                    {form.phone && <span className="text-blue-300 text-sm">📞 {form.phone}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-7">
                  {[{key: 'profile', label: t.section_profile}, {key: 'experience', label: t.section_exp}].map(({key, label}) => cv[key] && (
                    <div key={key}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 rounded-full bg-blue-600"></div>
                        <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">{label}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-100">{cv[key]}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-7">
                  {[{key: 'skills', label: t.section_skills}, {key: 'education', label: t.section_edu}].map(({key, label}) => cv[key] && (
                    <div key={key}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 rounded-full bg-indigo-500"></div>
                        <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">{label}</h3>
                      </div>
                      {key === 'skills' ? (
                        <div className="flex flex-wrap gap-2">
                          {cv.skills.split(',').map((s: string, i: number) => (
                            <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100 font-medium">{s.trim()}</span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm leading-relaxed">{cv[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-10 pb-10">
              <button onClick={downloadPDF}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm">
                📄 {t.download}
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-gray-400 text-xs">🔒 Paiement sécurisé · Données confidentielles · Satisfait ou remboursé</p>
        </div>
      </div>
    </div>
  );
}