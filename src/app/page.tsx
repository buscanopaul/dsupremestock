import Chart from "@/components/Chart";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-5">
      <div className="max-w-screen-lg border-gray-800 border-[1px] rounded-2xl mx-auto w-full h-full p-6">
        <Header />
        <div className="pt-10" />
        <Chart />
      </div>
    </main>
  );
}
