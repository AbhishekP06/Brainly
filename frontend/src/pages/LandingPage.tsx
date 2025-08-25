import Card from "../components/Card"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function LandingPage() {
    return (
        <>
            <div className="relative min-h-screen">
                {/* Background layer with opacity */}
                <div className="absolute inset-0 bg-[url('/topography.svg')] bg-repeat opacity-20" />

                {/* Foreground content */}
                <div className="relative z-10">
                    <Navbar />
                    <Card />
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default LandingPage