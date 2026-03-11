const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          About <span className="text-emerald-400">StarkShop</span>
        </h1>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          We're passionate about bringing you the best products at the best
          prices. Our mission is to make premium quality accessible to everyone.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-2xl p-8 text-center hover:border-emerald-500/40 border border-white/10 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-gray-400">
              Every product is carefully curated and verified to meet our high
              quality standards.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 text-center hover:border-emerald-500/40 border border-white/10 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
            <p className="text-gray-400">
              We work directly with manufacturers to offer you competitive
              prices without compromising quality.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 text-center hover:border-emerald-500/40 border border-white/10 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
            <p className="text-gray-400">
              Our customers are at the heart of everything we do. Your
              satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-4xl font-bold text-emerald-400">10K+</h4>
            <p className="text-gray-400 mt-2">Products</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-emerald-400">50K+</h4>
            <p className="text-gray-400 mt-2">Happy Customers</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-emerald-400">99%</h4>
            <p className="text-gray-400 mt-2">Satisfaction Rate</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-emerald-400">24/7</h4>
            <p className="text-gray-400 mt-2">Support</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
          At StarkShop, we believe everyone deserves access to premium products.
          We're building a platform that connects you with the best brands and
          products from around the world, delivered right to your doorstep with
          care and speed.
        </p>
      </section>
    </div>
  );
};

export default About;
