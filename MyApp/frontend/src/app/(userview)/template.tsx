import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HomeProvider } from "@/contexts/home.context";
import Background from "./homeComponents/Background";

export default async function HomeTemplate({ children }: { children: React.ReactNode }) {
  return (
    <HomeProvider>
      <main className="w-screen h-screen">
        <Background />
        <div className="w-full h-full" id="app">
          <Navbar />
          {children}
          <Footer />
        </div>
      </main>
    </HomeProvider>
  );
}
