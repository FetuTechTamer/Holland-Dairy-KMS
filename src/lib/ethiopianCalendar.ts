/**
 * Ethiopian Calendar utility for Holland Dairy KMS
 * All user-facing dates use Ethiopian Calendar in "Day/Month/Year" format.
 * Reference: September 11, 2024 (Gregorian) = 1/1/2017 (Ethiopian)
 * Current Ethiopian Year: 2019 (as of 2026)
 *
 * Examples provided:
 * - April 7, 2025 (Greg) = 29/7/2017 → but spec says "10/2/2019" = Sene 10, 2019
 * - The spec maps: Gregorian 2025/2026 → Ethiopian year 2017/2018/2019
 * We follow the actual ET calendar algorithm for correctness.
 */

export interface EthiopianDate {
  year: number;
  month: number; // 1-indexed: 1=Meskerem ... 13=Pagume
  day: number;
}

export const ET_MONTH_NAMES_AM = [
  '', // 0-index placeholder
  'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
];

export const ET_MONTH_NAMES_EN = [
  '', // 0-index placeholder
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
];

/**
 * Converts a Gregorian date to an Ethiopian date using the Julian Day Number method.
 * Ethiopian calendar is 7–8 years behind Gregorian.
 */
export const gregorianToEthiopian = (date: Date): EthiopianDate => {
  const g_year = date.getFullYear();
  const g_month = date.getMonth() + 1; // 1-indexed
  const g_day = date.getDate();

  // Julian Day Number for the Gregorian date
  const jdn_gregorian =
    367 * g_year -
    Math.floor((7 * (g_year + Math.floor((g_month + 9) / 12))) / 4) -
    Math.floor((3 * (Math.floor((g_year + (g_month - 9) / 7) / 100) + 1)) / 4) +
    Math.floor((275 * g_month) / 9) +
    g_day +
    1721028.5;

  // Ethiopian epoch in JDN
  const jdn_epoch = 1724220.5; // Meskerem 1, 1 EC = August 27, 8 AD (Julian)

  const r = jdn_gregorian - jdn_epoch;

  const n = r % 1461; // 1461 = 4 * 365 + 1 (leap cycle)
  const et_year = Math.floor(r / 1461) * 4 + Math.min(Math.floor(n / 365), 3) + 1;

  const year_start_jdn = jdn_epoch + (et_year - 1) * 365 + Math.floor((et_year - 1) / 4);
  const day_of_year = Math.floor(jdn_gregorian) - Math.floor(year_start_jdn); // 0-based

  const et_month = Math.floor(day_of_year / 30) + 1;
  const et_day = (day_of_year % 30) + 1;

  return {
    year: et_year,
    month: Math.min(et_month, 13),
    day: et_day,
  };
};

/**
 * Formats an Ethiopian date as "Day/Month/Year" (numeric)
 * e.g. "10/9/2019"
 */
export const formatEthiopianDateNumeric = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '—';
  const { year, month, day } = gregorianToEthiopian(d);
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date with the month name in the given language.
 * Amharic: "ሰኔ 10, 2019 ዓ.ም"
 * English: "Sene 10, 2019 EC"
 */
export const formatEthiopianDateNamed = (
  date: Date | string,
  lang: 'am' | 'en' = 'am'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '—';
  const { year, month, day } = gregorianToEthiopian(d);
  const names = lang === 'am' ? ET_MONTH_NAMES_AM : ET_MONTH_NAMES_EN;
  const monthName = names[month] || names[13];
  if (lang === 'am') {
    return `${monthName} ${day}፣ ${year} ዓ.ም`;
  }
  return `${monthName} ${day}, ${year} EC`;
};

/**
 * Returns the current Ethiopian year (e.g. 2019).
 */
export const getCurrentEthiopianYear = (): number => {
  return gregorianToEthiopian(new Date()).year;
};

/**
 * Get today's Ethiopian date as a numeric string: "DD/MM/YYYY"
 */
export const getTodayEthiopian = (): string => {
  return formatEthiopianDateNumeric(new Date());
};

/**
 * Main export used all over the app.
 * Uses numeric format by default: "10/2/2019"
 */
export const formatEthiopianDate = formatEthiopianDateNumeric;

// Keep old name for backwards compatibility
export const toEthiopianDate = gregorianToEthiopian;
