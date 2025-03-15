import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DataAnalysis from "../img/hero-section-gif.gif";
import Visualization from "../img/VisualizationData.png";
import why_data from "../img/why-data.gif";
import barChartImg from "../img/barChart.png";
import pieChartImg from "../img/pieChart.png";
import lineChartImg from "../img/lineChart.png";
import histoGramImg from "../img/histogGram.png";

export default function LandingPage() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <main className="font-sans bg-gray-50 bg-gray-100">

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 bg-gray-100">
        <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h2 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium text-[#3C55A5] tracking-tight">
              Unlock Your Data Potential With{" "}
              <span className="text-[#22B04B]"> Reandata</span>
            </h2>
            <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl">
              Access free, beginner-friendly resources to learn data analysis,
              visualization, and more. Start your journey today and build a
              solid foundation for your data career.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-[20px] bg-[#22B04B] opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            data-aos="zoom-in"
            data-aos-delay="75"
          >
            <img
              src={DataAnalysis}
              alt="Hero Image"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="px-4 bg-gray-100">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 ">
          {/* Content Box */}
          <div
            className="md:w-1/2 mb-8 md:mb-0"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#3C55A5] relative overflow-hidden"
                data-aos="fade-right"
                data-aos-duration="1000"
            >
              {/* Accent Corner */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#3C55A5] opacity-10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-[#22B04B] opacity-10 rounded-full"></div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#3C55A5] relative">
                Start Your Data Analytics Journey with{" "}
                <span className="text-[#22B04B] block md:inline">Reandata</span>
              </h2>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Our goal is to make learning data analytics{" "}
                  <span className="font-medium">simple, fun, and free</span>{" "}
                  for everyone. Whether you're just starting or looking to
                  improve, we have everything you need.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Learn at your own pace, explore real projects, and open the
                  door to new career possibilities in data analytics.
                </p>

                {/* Feature Points */}
                <div className="mt-6 space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B04B] bg-opacity-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#22B04B]"></div>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Self-paced learning modules
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B04B] bg-opacity-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#22B04B]"></div>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Real-world data projects
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B04B] bg-opacity-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#22B04B]"></div>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Interactive learning experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="md:w-1/2 flex justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -z-10 w-full h-full bg-[#3C55A5] rounded-2xl -right-4 -bottom-4"></div>
              <div className="absolute -z-10 w-32 h-50 bg-[#22B04B] bg-opacity-20 rounded-full -left-10 -top-10"></div>

              {/* Main Image with Frame */}
              <div className="relative bg-white p-3 rounded-2xl shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3C55A5] to-[#22B04B]"></div>
                <img
                  src={Visualization}
                  alt="Data journey illustration"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full font-sans bg-gray-50 px-6 py-16" style={{ backgroundColor: "whitesmoke" }}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3C55A5]" data-aos="fade-up">
            Why Choose <span className="text-[#22B04B]">Reandata ?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
              <div className="flex justify-center mb-6">
                <div className="text-5xl text-[#3C55A5]">📊</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-[#3C55A5]">Real-World Datasets</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Practice with authentic datasets like AirData and Food & Beverages for hands-on, interactive learning experiences.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
              <div className="flex justify-center mb-6">
                <div className="text-5xl  text-[#3C55A5]">⚙️</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-[#3C55A5]">Powerful Data Tools</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Simplified data management with intuitive tools for filtering, listing, viewing, and searching datasets efficiently.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
              <div className="flex justify-center mb-6">
                <div className="text-5xl  text-[#3C55A5]">📈</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-[#3C55A5]">Interactive Visualizations</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Transform raw data into meaningful insights with dynamic charts and intuitive graphs for better decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Data Analytics Section */}
      <section className="px-6 py-16" style={{ backgroundColor: "whitesmoke" }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="md:w-1/2 order-2 md:order-1" data-aos="fade-right">
            <img
              src={why_data}
              alt="Data analytics benefits"
              className="w-full max-w-lg h-auto"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 order-1 md:order-2" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3C55A5] mb-6 text-center md:text-left leading-snug">
              Why Data Analytics <span className="text-[#22B04B]">Matters</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Data analytics empowers you to uncover hidden patterns, make informed decisions, and solve
              real-world problems. In today's data-driven world, it's a skill that opens doors to countless opportunities.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're a beginner or a professional, understanding data analytics helps you stay ahead,
              boost your career, and contribute to impactful projects.
            </p>
          </div>
        </div>
      </section>

        {/* Learn About Graphs Section */}
      <section className="px-4 py-10 bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3C55A5]">
              Learn About <span className="text-[#22B04B]">Graphs</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Graphs make complex data easy to understand and analyze. Explore these common visualization types to enhance your data storytelling skills.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bar Chart Card */}
            <div className="group" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100">
                <div className="p-1">
                  <img src={barChartImg} alt="Bar Chart" className="w-full h-[220px] object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#3C55A5] mb-2 text-bold">Bar Charts</h3>
                  <p className="text-gray-600 text-sm">Compare values across categories with rectangular bars.</p>
                </div>
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="group" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100">
                <div className="p-1">
                  <img src={pieChartImg} alt="Pie Chart" className="w-full h-[220px] object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#3C55A5] mb-2 text-bold">Pie Charts</h3>
                  <p className="text-gray-600 text-sm">Show proportions and percentages of a whole using circular segments.</p>
                </div>
              </div>
            </div>

            {/* Line Graph Card */}
            <div className="group" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100">
                <div className="p-1">
                  <img src={lineChartImg} alt="Line Graph" className="w-full h-[220px] object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#3C55A5] mb-2 text-bold">Line Graphs</h3>
                  <p className="text-gray-600 text-sm">Display data trends over continuous intervals or time periods.</p>
                </div>
              </div>
            </div>

            {/* Histogram Card */}
            <div className="group" data-aos="fade-up" data-aos-delay="400">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-100">
                <div className="p-1">
                  <img src={histoGramImg} alt="Histogram" className="w-full h-[220px] object-cover" />
                </div>
                <div className="p-5 ">
                  <h3 className="font-semibold text-lg text-[#3C55A5] mb-2 text-bold">Histograms</h3>
                  <p className="text-gray-600 text-sm">Show frequency distributions of continuous data variables.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
      {/* Call to Action Section */}
      <section className="py-10 bg-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-8 md:mb-0">
                  <h1 className="text-[48px] md:text-4xl font-bold mb-4 text-[#3C55A5]">
                    Ready to Start Your Data Learning <br /><span className="text-[#22B04B]">Journey?</span>
                  </h1>
                  </div>
                  <button className="px-6 py-4 bg-[#22B04B] hover:bg-[#1E9A3D] text-white rounded-full font-semibold  hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started Now
                  </button>
                </div>
              </div>
      </section>
      
    </main>
  );
}