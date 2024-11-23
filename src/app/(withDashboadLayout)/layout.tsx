"use client";

import { isLoggedIn } from "@/services/authServices";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  return (
    <div>
      <h1>Hello</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
