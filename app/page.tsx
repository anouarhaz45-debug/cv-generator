'use client';
import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<any>(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', job: '', exp: '', skills: '', edu: ''
  });

  const t: any = {
    fr: { title: 'Créez votre CV en 30 secondes', sub: "L'IA génère un CV professionnel pour vous", btn: "Générer mon CV avec l'IA", name: 'Prénom & Nom', email: 'Email', phone: 'Téléphone', job: 'Poste visé', exp: 'Expériences professionnelles', skills: 'Compétences', edu: 'Formation', free: '1er CV gratuit', generating: 'Génération en cours...', download: 'Télécharger en PDF' },
    en: { title: 'Create your CV in 30 seconds', sub: 'AI generates a professional CV for you', btn: 'Generate my CV with AI', name: 'Full Name', email: 'Email', phone: 'Phone', job: 'Target Position', exp: 'Work Experience', skills: 'Skills', edu: 'Education', free: '1st CV free', generating: 'Generating...', download: 'Download PDF' }
  }[lang];

  const generate = async () => {
    if (!form.name || !form.job) return alert('Remplis ton nom et le poste visé !');
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
    } catch (e) {
      alert('Erreur, réessaie.');
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>CV - ${form.name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: white; }
            .page { display: flex; min-height: 100vh; }
            .sidebar { width: 220px; min-width: 220px; background: #1e3a5f; color: white; padding: 30px 20px; }
            .main { flex: 1; padding: 35px 30px; }
            .avatar { width: 80px; height: 80px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; color: white; margin: 0 auto 16px; }
            .sidebar-name { font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 4px; }
            .sidebar-job { font-size: 11px; color: #93c5fd; text-align: center; margin-bottom: 24px; }
            .sidebar-section { margin-bottom: 20px; }
            .sidebar-section-title { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; border-bottom: 1px solid #3b82f6; padding-bottom: 4px; margin-bottom: 10px; }
            .sidebar-item { font-size: 11px; color: #e2e8f0; margin-bottom: 6px; line-height: 1.5; }
            .main-name { font-size: 30px; font-weight: bold; color: #1e3a5f; }
            .main-job { font-size: 14px; color: #3b82f6; margin-bottom: 20px; font-weight: 500; }
            .divider { height: 3px; background: linear-gradient(to right, #3b82f6, #e2e8f0); margin-bottom: 20px; border-radius: 2px; }
            .section { margin-bottom: 22px; }
            .section-title { font-size: 11px; font-weight: bold; color: #1e3a5f; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
            .section-title::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
            .section-text { font-size: 12px; line-height: 1.8; color: #374151; white-space: pre-line; }
            .tag { display: inline-block; background: #eff6ff; color: #1e3a5f; font-size: 10px; padding: 3px 10px; border-radius: 20px; margin: 2px; border: 1px solid #bfdbfe; }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="sidebar">
              <div class="avatar">${form.name.charAt(0).toUpperCase()}</div>
              <div class="sidebar-name">${form.name}</div>
              <div class="sidebar-job">${form.job}</div>

              ${form.email || form.phone ? `
              <div class="sidebar-section">
                <div class="sidebar-section-title">Contact</div>
                ${form.email ? `<div class="sidebar-item">✉ ${form.email}</div>` : ''}
                ${form.phone ? `<div class="sidebar-item">📞 ${form.phone}</div>` : ''}
              </div>` : ''}

              ${cv.skills ? `
              <div class="sidebar-section">
                <div class="sidebar-section-title">Compétences</div>
                ${cv.skills.split(',').map((s: string) => `<div class="sidebar-item">▸ ${s.trim()}</div>`).join('')}
              </div>` : ''}

              ${cv.education ? `
              <div class="sidebar-section">
                <div class="sidebar-section-title">Formation</div>
                <div class="sidebar-item">${cv.education}</div>
              </div>` : ''}
            </div>

            <div class="main">
              <div class="main-name">${form.name}</div>
              <div class="main-job">${form.job}</div>
              <div class="divider"></div>

              ${cv.profile ? `
              <div class="section">
                <div class="section-title">Profil</div>
                <div class="section-text">${cv.profile}</div>
              </div>` : ''}

              ${cv.experience ? `
              <div class="section">
                <div class="section-title">Expériences professionnelles</div>
                <div class="section-text">${cv.experience}</div>
              </div>` : ''}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const inputClass = "w-full mt-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const textareaClass = "w-full mt-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full">✨ {t.free}</span>
          <h1 className="text-4xl font-bold mt-4 mb-2 text-gray-900">{t.title}</h1>
          <p className="text-gray-500 text-lg">{t.sub}</p>
          <div className="flex gap-2 justify-center mt-5">
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${lang === l ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                {l === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.name} *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="ex: Ahmed Benali" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.job} *</label>
              <input value={form.job} onChange={e => setForm({...form, job: e.target.value})}
                placeholder="ex: Développeur Web" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.email}</label>
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                placeholder="ahmed@email.com" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.phone}</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+33 6 00 00 00 00" className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.exp}</label>
              <textarea value={form.exp} onChange={e => setForm({...form, exp: e.target.value})}
                placeholder="ex: 2 ans chez Amazon en tant que préparateur de commandes..." rows={3} className={textareaClass} />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.skills}</label>
              <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})}
                placeholder="ex: Python, Excel, anglais courant, permis B..." className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t.edu}</label>
              <input value={form.edu} onChange={e => setForm({...form, edu: e.target.value})}
                placeholder="ex: Bac+2 Informatique, Université d'Orléans" className={inputClass} />
            </div>
          </div>

          <button onClick={generate} disabled={loading}
            className="w-full mt-6 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base hover:bg-blue-700 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-200">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {t.generating}
              </span>
            ) : `✨ ${t.btn}`}
          </button>
        </div>

        {cv && (
          <div id="cv-print" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
              <h2 className="text-3xl font-bold">{form.name}</h2>
              <p className="text-blue-100 text-lg font-medium mt-1">{form.job}</p>
              {(form.email || form.phone) && (
                <div className="flex gap-4 mt-3 text-blue-200 text-sm">
                  {form.email && <span>✉️ {form.email}</span>}
                  {form.phone && <span>📞 {form.phone}</span>}
                </div>
              )}
            </div>

            <div className="p-8 space-y-6">
              {[
                { key: 'profile', label: lang === 'fr' ? '👤 Profil' : '👤 Profile' },
                { key: 'experience', label: lang === 'fr' ? '💼 Expériences' : '💼 Experience' },
                { key: 'skills', label: lang === 'fr' ? '⚡ Compétences' : '⚡ Skills' },
                { key: 'education', label: lang === 'fr' ? '🎓 Formation' : '🎓 Education' },
              ].map(({ key, label }) => cv[key] && (
                <div key={key}>
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">{label}</h3>
                  <div className="h-0.5 bg-gradient-to-r from-blue-100 to-transparent mb-3"/>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{cv[key]}</p>
                </div>
              ))}
            </div>

            <div className="px-8 pb-8">
              <button onClick={downloadPDF}
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition">
                🖨️ {t.download}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}