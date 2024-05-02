import Sidebar from "@/components/ui/sidebar"



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div className="flex h-max">
        <Sidebar/>
        {children}
        </div>
      </body>
    </html>
  );
}
