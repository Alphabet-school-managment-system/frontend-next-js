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
