export const SYNODIC = 29.530588853;
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14, 0);

export const HIJRI_MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوّال",
  "ذو القعدة",
  "ذو الحجة",
] as const;

export const WEEKDAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export const GREG_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export type HijriDate = { year: number; month: number; day: number };

/** Tabular civil Hijri (Kuwaiti algorithm). Month is 1–12. */
export function gregorianToHijri(date: Date): HijriDate {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 3) {
    year -= 1;
    month += 12;
  }

  const century = Math.floor(year / 100);
  let gregorianShift = 2 - century + Math.floor(century / 4);
  if (year < 1583) gregorianShift = 0;

  const jd =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    gregorianShift -
    1524;

  let lunar = jd - 1948440 + 10632;
  const cycles = Math.floor((lunar - 1) / 10631);
  lunar = lunar - 10631 * cycles + 354;
  const leap =
    Math.floor((10985 - lunar) / 5316) * Math.floor((50 * lunar) / 17719) +
    Math.floor(lunar / 5670) * Math.floor((43 * lunar) / 15238);
  lunar =
    lunar -
    Math.floor((30 - leap) / 15) * Math.floor((17719 * leap) / 50) -
    Math.floor(leap / 16) * Math.floor((15238 * leap) / 43) +
    29;

  const hijriMonth = Math.floor((24 * lunar) / 709);
  const hijriDay = lunar - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * cycles + leap - 30;

  return { year: hijriYear, month: hijriMonth, day: hijriDay };
}

export function moonAgeDays(date: Date): number {
  const days = (date.getTime() - NEW_MOON_EPOCH) / 86_400_000;
  return ((days % SYNODIC) + SYNODIC) % SYNODIC;
}

export function illumination(ageDays: number): number {
  return (1 - Math.cos((2 * Math.PI * ageDays) / SYNODIC)) / 2;
}

export function phaseName(ageDays: number): string {
  const age = ((ageDays % SYNODIC) + SYNODIC) % SYNODIC;
  if (age < 1.85) return "محاق";
  if (age < 7.38) return "هلال متزايد";
  if (age < 9.22) return "تربيع أول";
  if (age < 14.77) return "أحدب متزايد";
  if (age < 16.61) return "بدر";
  if (age < 22.15) return "أحدب متناقص";
  if (age < 23.99) return "تربيع ثان";
  if (age < 27.68) return "هلال متناقص";
  return "محاق";
}
