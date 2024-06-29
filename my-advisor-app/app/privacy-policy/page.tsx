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
                        MyAdvisor Demo Privacy Policy
                    </h1>
                    <div className="text-left space-y-4">
                        <p>Date: June 21, 2024</p>
                        <p>Thank you for visiting myadvisordemo.io (&quot;the Website&quot;). Your privacy is important to us. This Privacy Policy explains our approach to user privacy.</p>
                        <h2 className="font-semibold text-lg">Information We Collect</h2>
                        <p>We do not collect any personal information from users. The Website is designed for demonstration purposes only, and users can log in automatically using a simple button without providing any credentials.</p>
                        <h2 className="font-semibold text-lg">Use of Information</h2>
                        <p>Since no personal information is collected, there is no user data to use or process.</p>
                        <h2 className="font-semibold text-lg">Data Retention and Erasure</h2>
                        <p>As we do not collect any personal information, there is no data to retain or erase.</p>
                        <h2 className="font-semibold text-lg">Security</h2>
                        <ul className="list-disc pl-6">
                            <li><strong>Encryption</strong>: We use SSL (Secure Socket Layer) encryption to protect data transmitted between your browser and our servers.</li>
                            <li><strong>Access Controls</strong>: Access to the demo site is unrestricted as no personal data is stored.</li>
                            <li><strong>Regular Audits</strong>: We conduct regular security audits to ensure the security of our demonstration environment.</li>
                        </ul>
                        <h2 className="font-semibold text-lg">Third-Party Services</h2>
                        <p>We do not use any third-party services that collect personal information.</p>

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
