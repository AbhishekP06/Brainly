import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="w-full py-4 mt-10 border-gray-200">
            <div className="max-w-6xl mx-auto px-4 flex justify-center items-center text-sm text-gray-600">
                <p>
                    Made with ❤️ by
                    <Link
                        to="https://yourportfolio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                    >{" abhi_ly_tech"}

                    </Link>
                </p>
                <p className="pl-1">© {new Date().getFullYear()} .paste — All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
