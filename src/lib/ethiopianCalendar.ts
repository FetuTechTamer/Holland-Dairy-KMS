/**
 * A lightweight utility to get the current Ethiopian Date.
 * Note: This is an approximation for UI display purposes.
 */

export const getEthiopianDate = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  // Ethiopian calendar logic simplified
  // Ethiopian new year is usually Sept 11 (or 12)
  let etYear = year - 8;
  if (month < 8 || (month === 8 && day < 11)) {
    etYear = year - 8;
  } else {
    etYear = year - 7;
  }

  // Very simplified month mapping for display
  // In reality, months have 30 days and there's a 13th month
  const etMonthIndex = (month + 4) % 12; // Approximation

  return {
    year: etYear,
    month: etMonthIndex,
    day: day, // This is just a placeholder for now
  };
};

export const formatEthiopianDate = (lang: 'am' | 'en') => {
  const { year, month } = getEthiopianDate();
  
  const amMonths = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"];
  const enMonths = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yakatit", "Magabit", "Miyazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagumiene"];
  
  const monthName = lang === 'am' ? amMonths[month] : enMonths[month];
  
  return lang === 'am' 
    ? `${monthName} ${year} ዓ.ም` 
    : `${monthName} ${year} EC`;
};
