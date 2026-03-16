import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, phone, job, exp, skills, edu, lang } = await req.json();

  const prompt = lang === 'fr'
    ? `Tu es un expert RH. Génère un CV professionnel en français. Réponds UNIQUEMENT en JSON avec ces 4 clés (valeurs en texte simple, pas de tableaux): profile, experience, skills, education.\n\nNom: ${name}\nPoste visé: ${job}\nExpériences: ${exp || 'Non renseigné'}\nCompétences: ${skills || 'Non renseigné'}\nFormation: ${edu || 'Non renseigné'}`
    : `You are an HR expert. Generate a professional CV in English. Reply ONLY in JSON with 4 keys (plain text values, no arrays): profile, experience, skills, education.\n\nName: ${name}\nPosition: ${job}\nExperience: ${exp || 'N/A'}\nSkills: ${skills || 'N/A'}\nEducation: ${edu || 'N/A'}`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: 'google/gemma-3-4b-it:free',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.choices[0].message.content;
  const clean = text.replace(/```json|```/g, '').trim();

  let cv;
  try {
    const parsed = JSON.parse(clean);
    cv = {
      profile: typeof parsed.profile === 'string' ? parsed.profile : JSON.stringify(parsed.profile),
      experience: typeof parsed.experience === 'string' ? parsed.experience : parsed.experience?.map((e: any) => `${e.title || e.position || ''} - ${e.company || ''}: ${e.description || ''}`).join('\n\n') || '',
      skills: typeof parsed.skills === 'string' ? parsed.skills : parsed.skills?.join(', ') || '',
      education: typeof parsed.education === 'string' ? parsed.education : parsed.education?.map((e: any) => `${e.degree || ''} - ${e.university || e.details || ''}`).join('\n') || ''
    };
  } catch(e) {
    cv = { profile: clean, experience: '', skills: '', education: '' };
  }

  return NextResponse.json(cv);
}