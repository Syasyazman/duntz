import Card from "./components/Card/card";

export default function Home() {
  return (
    <div className="flex justify-center bg-primary p-2 h-[100%]">
      <Card height="auto" width="30%" />
      <Card height="auto" width="70%" />
    </div>
  );
}
