'use client';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOut } from "@/redux/features/auth-slice";
import { RootState } from "@/redux/store";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const ProfilOptions = () => {

    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2 border rounded-lg p-2">
                    <Image src="/images/avatar.png" alt="avatar" width={30} height={30} />
                    <h1>{auth.name}</h1>


                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button onClick={() => {
                        // router.push("/dashboard/profil")
                        }} variant={"outline"} className="w-full flex items-center gap-1">
                        <User />
                        Profil
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        variant={"destructive"}
                        className="w-full flex items-center gap-1"
                        onClick={() => {
                            dispatch(logOut());
                            // Supprimer le cookie 'token'
                            Cookies.remove('token', { path: '/' });

                            // Vérification
                            
                            router.push("/");
                        }}
                    >
                        <LogOut />
                        Se déconnecter
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default ProfilOptions;