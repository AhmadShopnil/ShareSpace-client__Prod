import {
  LayoutDashboard,
  BookOpen,
  UserCog,
  CircleHelp,
  FileText,
} from "lucide-react";
import { TSidebarItem } from "../../interfaces";

export const adminMenuItem: TSidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/dashboard/admin/user-management",
    icon: UserCog,
  },
  {
    name: "Home Space Management",
    path: "/dashboard/admin/home-space-management",
    icon: BookOpen,
  },

  {
    name: "Work Space Management",
    path: "/dashboard/admin/work-space-management",
    icon: CircleHelp,
  },
  {
    name: "Shop Space Management",
    path: "/dashboard/admin/shop-space-management",
    icon: FileText,
  },
];
