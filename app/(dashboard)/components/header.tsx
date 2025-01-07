
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ProfilOptions from "./profil-options";
const Header = () => {
    return (
        <header className="flex justify-between content-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center">
             <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Image src="/images/logo/logo.png" alt="avatar" width={150} height={150} />
          </div>
         

          <div>
          <ProfilOptions />
          </div>
        </header>
    );
}

export default Header;