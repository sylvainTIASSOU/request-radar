import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar";
import Header from "./components/header";



export default function FarderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4">


          {children}
        </main>
      </SidebarInset>

    </SidebarProvider>


    //  <div className="">


    //     
    //     <FarmerSideBar/>

    //   {children}

    //  </div>






  );
}
