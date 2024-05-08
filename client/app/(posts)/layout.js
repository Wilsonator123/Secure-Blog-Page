import Sidebar from "@/components/ui/sidebar"

export default function Layout({ children }) {
  return (
    <div className="flex">
        <Sidebar/>
        {children}
    </div>
  );
}