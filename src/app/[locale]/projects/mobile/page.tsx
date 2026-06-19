import { redirect } from "@/i18n/navigation";

export default function WebProjectsPage() {
  // 直接導向全部頁面，並可以帶入 query param 或之後實作獨立篩選
  redirect({ href: "/projects/all" });
}