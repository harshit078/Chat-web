import { Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from 'react-hot-toast';

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Real Time Chat",
  description: "Get to talking now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            toastOptions={{
              className: "dark:bg-slate-800 dark:text-white text-black bg-white",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
