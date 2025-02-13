import type { Metadata } from "next";
import Topbar from "./components/Topbar/topbar";
import "./styles/tailwind.css";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Duntz App",
  description: "A song sharing application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary text-white h-screen w-screen flex-col">
        <div className="bg-primary text-white h-[8%]">
          <Topbar />
        </div>
        <div className="h-[80%] bg-purple-100">
          {children}
        </div>
        <div className="bg-primary text-white h-[12%]">Test</div>
      </body>
    </html>
  );
}
