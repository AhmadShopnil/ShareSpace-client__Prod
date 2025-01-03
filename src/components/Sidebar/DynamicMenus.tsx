import { useState, useEffect } from "react";
import { TSidebarItem } from "../../interfaces"; // Assuming you have an interface defined
import Link from "next/link";
import { usePathname } from "next/navigation";

const DynamicMenus = ({ menuItems }: { menuItems: TSidebarItem[] }) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>(pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [pathname]);

  const handleClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <ul className="space-y-2">
      {menuItems.map((item, index) => {
        const isActive = activePath === item.path;

        return (
          <li key={index}>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium 
                rounded-md 
                transition-colors duration-150 ease-in-out ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-gray-100 hover:bg-gray-100 hover:text-black"
                }`}
              href={item.path}
              onClick={() => handleClick(item.path)}
            >
              <item.icon
                className={`h-5 w-5 mr-3 ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : " hover:bg-gray-100 hover:text-black"
                }`}
              />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DynamicMenus;
