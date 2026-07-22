import Link from "next/link";
import { logOut } from "../../utils/LogOut";
import { useRouter } from "next/navigation";

const AdminNavLinkComponent = ({
  href,
  icon,
  children,
  isLogout = false
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLogout?: boolean;
}) => {
  const router = useRouter();

  return (
    <Link
      href={isLogout ? '#' : href}
      onClick={async () => {
        if (isLogout) {
          await logOut();
          return router.push(`/login`);
        }
      }}
      className={`
        group relative flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full font-medium text-sm
        border transition-all duration-200 overflow-hidden
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#241B15]
        ${isLogout
          ? "border-[#7A2E1E] text-[#F2A365] hover:text-white focus:ring-[#B8390E]"
          : "border-white/15 text-white/80 hover:text-white focus:ring-[#EA5B22]"}
      `}
    >
      {/* fill that slides in on hover */}
      <span
        className={`
          absolute inset-0 -translate-x-full group-hover:translate-x-0
          transition-transform duration-300 ease-out
          ${isLogout
            ? "bg-gradient-to-r from-[#B8390E] to-[#7A2E1E]"
            : "bg-gradient-to-r from-[#EA5B22] to-[#B8390E]"}
        `}
      />

      <span
        className={`
          relative z-10 flex items-center justify-center w-6 h-6 rounded-full shrink-0
          ${isLogout ? "bg-[#7A2E1E]/40" : "bg-white/10"}
          group-hover:bg-white/20 transition-colors
        `}
      >
        {icon}
      </span>
      <span className="relative z-10 select-none whitespace-nowrap">{children}</span>
    </Link>
  );
};

export default AdminNavLinkComponent;