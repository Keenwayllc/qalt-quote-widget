"use client";

import { createContext, useContext, useState } from "react";

interface CompanyProfile {
  logoUrl: string;
  profilePicUrl: string;
  companyName: string;
}

interface CompanyProfileContextValue extends CompanyProfile {
  updateProfile: (patch: Partial<CompanyProfile>) => void;
}

const CompanyProfileContext = createContext<CompanyProfileContextValue | null>(null);

export function CompanyProfileProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial: CompanyProfile;
}) {
  const [profile, setProfile] = useState<CompanyProfile>(initial);

  const updateProfile = (patch: Partial<CompanyProfile>) =>
    setProfile((prev) => ({ ...prev, ...patch }));

  return (
    <CompanyProfileContext.Provider value={{ ...profile, updateProfile }}>
      {children}
    </CompanyProfileContext.Provider>
  );
}

export function useCompanyProfile() {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) throw new Error("useCompanyProfile must be used inside CompanyProfileProvider");
  return ctx;
}
