import type { Metadata } from "next";
import Topbar from "./components/Topbar/topbar";
import Card from "./components/Card/card";
import Navbar from "./components/Navbar/navbar";
import CardContent from "./components/CardContent/cardContent";
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
        <div className="h-[80%] bg-primary flex justify-center bg-primary px-2 h-[100%]">
            <Card height="auto" width="30%">
              <Navbar />
              <div className="h-full w-full mt-8">
                <CardContent cardNum={0} />
              </div>
            </Card>
            <Card height="auto" width="70%">
              <div className="h-full w-full">
                <CardContent cardNum={1} children={children} />
              </div>
            </Card>
        </div>
        <div className="bg-primary text-white h-[12%]">Test</div>
      </body>
    </html>
  );
}
