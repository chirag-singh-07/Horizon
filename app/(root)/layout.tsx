import MoblieNav from "@/components/MoblieNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = { firstName: "Chirag", lastName: "Singh" };

  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={loggedIn} />
      <div className="flex size-full flex-col">
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
        {children}
      </div>
    </main>
  );
}
