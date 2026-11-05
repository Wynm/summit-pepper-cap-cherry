export type Degree = {
  name: string;
  semis: number;
  cents: number;
};

export type Maqam = {
  id: string;
  name: string;
  blurb: string;
  degrees: Degree[];
};

const WORDS = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة", "السابعة", "جواب"];

function scale(
  id: string,
  name: string,
  blurb: string,
  cents: number[],
): Maqam {
  return {
    id,
    name,
    blurb,
    degrees: cents.map((total, index) => ({
      name: WORDS[index] ?? String(index + 1),
      semis: Math.trunc(total / 100),
      cents: total - Math.trunc(total / 100) * 100,
    })),
  };
}

export const MAQAMS: Maqam[] = [
  scale("rast", "راست", "مسافة الثالثة والسابعة نصف بيمول. مقام الاستقرار والافتتاح.", [
    0, 200, 350, 500, 700, 900, 1050, 1200,
  ]),
  scale("bayati", "بياتي", "الثانية نصف بيمول. مقام قريب من الحكي، دافئ وقصير النفس.", [
    0, 150, 300, 500, 700, 800, 1000, 1200,
  ]),
  scale("hijaz", "حجاز", "ثانية صغيرة تليها زائدة. القفزة هي طابع المقام.", [
    0, 100, 400, 500, 700, 800, 1000, 1200,
  ]),
  scale("saba", "صبا", "تقريب معدّل لمقام لا يستقر على جوابه بسهولة.", [
    0, 150, 300, 400, 700, 800, 1000, 1200,
  ]),
  scale("nahawand", "نهاوند", "قريب من الصغير المتناغم: السابعة مرتفعة.", [
    0, 200, 300, 500, 700, 800, 1100, 1200,
  ]),
  scale("kurd", "كرد", "الثانية صغيرة. مقام مباشر، أرضه منخفضة.", [
    0, 100, 300, 500, 700, 800, 1000, 1200,
  ]),
  scale("ajam", "عجم", "السلم الكبير. يفيد للمقارنة لا بوصفه غاية المقام.", [
    0, 200, 400, 500, 700, 900, 1100, 1200,
  ]),
];

export const TONICS: { midi: number; name: string }[] = [
  { midi: 60, name: "دو" },
  { midi: 62, name: "ري" },
  { midi: 64, name: "مي" },
  { midi: 65, name: "فا" },
  { midi: 67, name: "صول" },
  { midi: 69, name: "لا" },
];

export function findMaqam(id: string): Maqam {
  return MAQAMS.find((item) => item.id === id) ?? MAQAMS[0]!;
}

export function centsOf(degree: Degree): number {
  return degree.semis * 100 + degree.cents;
}
