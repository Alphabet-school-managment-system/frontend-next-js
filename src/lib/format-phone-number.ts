"use client";

export const FormatPhoneNumber = (v: unknown) => {
  if (typeof v !== "string" && typeof v !== "number") {
    return { raw: "", formatted: "" };
  }

  const str = String(v);
  const raw = str.replace(/\D/g, "").slice(0, 10);

  const parts = [
    raw.slice(0, 3),
    raw.slice(3, 5),
    raw.slice(5, 7),
    raw.slice(7, 9),
  ].filter(Boolean);

  return { raw, formatted: parts.join(" ") };
};

export const isValidISBN = (isbn: string): boolean => {
  isbn = isbn.replace(/[-\s]/g, "");

  // ISBN-10
  if (/^\d{9}(\d|X)$/.test(isbn)) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * parseInt(isbn[i], 10);
    }
    sum += isbn[9] === "X" ? 10 * 10 : 10 * parseInt(isbn[9], 10);
    return sum % 11 === 0;
  }

  // ISBN-13
  if (/^\d{13}$/.test(isbn)) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i], 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const check = (10 - (sum % 10)) % 10;
    return check === parseInt(isbn[12], 10);
  }

  return false;
}
