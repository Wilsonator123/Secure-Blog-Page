import Sidebar from "@/components/ui/sidebar"



export default function SidebarLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div className="flex h-max mb-8">
        <Sidebar/>
        {children}
        </div>
      </body>
    </html>
  );
}
