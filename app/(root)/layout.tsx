"use client";

import MoblieNav from "@/components/MoblieNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = { firstName: "Chirag", lastName: "Singh" };
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <main className="flex h-screen w-full font-inter">
      {!isAuthPage && <SideBar user={loggedIn} />}
      <div className="flex size-full flex-col">
        {!isAuthPage && (
          <div className="root-layout">
            <Image
              src={"/icons/logo.svg"}
              alt="menu logo"
              width={30}
              height={30}
            />
            <div>
              <MoblieNav user={loggedIn} />
            </div>
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
