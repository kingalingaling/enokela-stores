import { UserButton, auth } from "@clerk/nextjs";
import {useState} from "react";

import { MainNav } from "./mainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const dynamic = "force-dynamic";

const Navbar = () => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then(setStores);
  }, []);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
