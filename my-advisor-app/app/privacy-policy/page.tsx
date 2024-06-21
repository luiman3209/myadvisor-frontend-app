import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/NavBar";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container 2xl:ml-64 px-4 py-6">
                <div className="h-full bg-white space-y-6 
                flex flex-col justify-center items-center
                shadow-md rounded-lg p-6">
                    <h1 className="font-bold text-2xl">
                        Privacy Policy
                    </h1>
                    <div className="text-left space-y-4">
                        <p>Date: June 21, 2024</p>
                        <p>Thank you for visiting myadvisordemo.io ("the Website"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect information about you.</p>
                        <h2 className="font-semibold text-lg">Information We Collect</h2>
                        <ul className="list-disc pl-6">
                            <li><strong>Personal Information</strong>: When you register as an advisor or investor, we may ask for personal information such as your name and email address. This information will be stored temporarily for a maximum of 1 hour for the purpose of demo evaluation and will then be completely erased from our systems.</li>
                            <li><strong>Usage Data</strong>: We may collect non-personal information about how you interact with the Website, such as the pages visited or actions taken, to improve our services.</li>
                        </ul>
                        <h2 className="font-semibold text-lg">Use of Information</h2>
                        <p>We use the personal information you provide solely for the purpose of making the user test the private functionalities for 1 hour until their account gets deleted and their data erased from our systems.</p>
                        <h2 className="font-semibold text-lg">Data Retention and Erasure</h2>
                        <p>All personal information collected will be automatically erased from our systems after 1 hour from the time of submission.</p>
                        <h2 className="font-semibold text-lg">Security</h2>
                        <ul className="list-disc pl-6">
                            <li><strong>Encryption</strong>: We use SSL (Secure Socket Layer) encryption to protect data transmitted between your browser and our servers.</li>
                            <li><strong>Access Controls</strong>: Access to personal information is restricted to authorized personnel only.</li>
                            <li><strong>Regular Audits</strong>: We conduct regular security audits to identify and address potential vulnerabilities.</li>
                            <li><strong>Data Minimization</strong>: We limit the collection and retention of personal information to what is strictly necessary for the demo evaluation purposes.</li>
                        </ul>
                        <h2 className="font-semibold text-lg">Third-Party Services</h2>
                        <p>We do not use any third-party services that collect personal information.</p>
                        <h2 className="font-semibold text-lg">Your Choices</h2>
                        <p>You are free to use fake data for registration, except for the email needed for account confirmation. This ensures you can access the demo functionalities while maintaining your privacy.</p>
                        <h2 className="font-semibold text-lg">Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        <h2 className="font-semibold text-lg">Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at luigimangione320@gmail.com.</p>
                    </div>
                    <Link href="/">
                        Go back to home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
