import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/contexts/auth.context";
import axios from "@/services/axios";
import { ToastContainer } from "react-toastify";
import config from "../../tailwind.config";
import type { Metadata, ResolvingMetadata, Viewport } from "next";
config.autoAddCss = false;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const response = await axios.get("/setting/public/seo");
    const seoData = response.data;

    return {
      icons: seoData.data?.favicon || null,
      title: seoData.data?.title || null,
      description: seoData.data?.description || null,
      keywords: seoData.data?.keywords || null,
    };
  } catch (error) {
    return {
      icons: "/icon.png",
      title: null,
      description: null,
      keywords: null,
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </body>
    </html>
  );
}
