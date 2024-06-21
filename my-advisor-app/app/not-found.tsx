import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/NavBar";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow  container 2xl:ml-64 px-4 py-6">
                <div className="h-full bg-white space-y-24 
                flex flex-col justify-center items-center
                shadow-md rounded-lg p-6 ">
                    <h1 className="font-bold text-2xl">
                        Page Not Found

                    </h1>
                    <Link href="/">
                        Go back to home
                    </Link>
                </div>
            </div>
            <Footer />

        </div>
    );
}