//this is the footer which will be displayed in all subsites (all URLs)

import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white p-4">
            <div className="text-dark-blue text-lg font-Lusitana mb-10 text-center"> {/* mb-10=botoom margin i Tailwind CSS */}
                You have reached the bottom of the website!
            </div>                                                  {/*dark blue text, font size = medium, font=Lusitana */}
            <div className="flex justify-between w-full">           {/*puts following elements horizontally*/}
                <div>
                    <div className="text-sm"> Add your email to our newsletter! </div>
                    <div>EMAIL FORM HERE </div>
                </div>
                <Link href="/privacy">
                <button type="button" className="px-4 py-2 bg-blue-950 text-white rounded underline">
                        Our terms of service
                    </button>
                </Link> 
                <Link href="/terms-of-service">
                    <button type="button" className="px-4 py-2 bg-blue-950 text-white rounded underline">
                        Our terms of service
                    </button>
                </Link>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <a href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
                        <FaInstagram style={{marginRight: "8px"}}/>
                        <div>Follow us on Instagram!</div>
                    </a>
                    <a href="http://sau.no" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
                        <FaFacebook style={{marginRight: "8px"}}/>
                        <div>Follow us on Facebook!</div>
                    </a>
                </div>
            </div>
        </footer>
    )
}