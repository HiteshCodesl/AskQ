import { MessageCircle, Sparkles, Users, Zap, ArrowRight, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-orange-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-orange-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-gray-900">askQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-orange-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
          </div>
          <button className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-orange-700 transition-colors">
            Get Started
          </button>
        </nav>
      </header>

      <main className="pt-20">
        <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ask Better
                <span className="block text-orange-600">Questions</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Transform the way you communicate. askQ helps you craft meaningful questions that get real answers and drive genuine conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
               <Link to={'/dashboard'}>
                <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-700 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30">
                  Start Asking
                  <ArrowRight className="w-5 h-5" />
                </button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">100+</span> users asking better
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl shadow-orange-600/40 transform rotate-3 group-hover:shadow-2xl group-hover:shadow-orange-600/60 transition-all duration-300">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3 space-y-5 group-hover:scale-105 transition-transform duration-300 group-hover:-rotate-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">How can I improve my productivity?</p>
                      <p className="text-xs text-gray-600 mt-1">You</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <User className='text-blue-500' />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">Try time-blocking and prioritizing high-impact tasks first thing in the morning.</p>
                      <p className="text-xs text-gray-600 mt-1">askQ Refined</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-300 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why askQ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Intelligent features designed to elevate your questions and conversations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Suggestions',
                  description: 'Get intelligent question suggestions that help you ask exactly what you need to know.'
                },
                {
                  icon: Users,
                  title: 'Community Insights',
                  description: 'Learn from the best questions asked by our thriving community of curious minds.'
                },
                {
                  icon: Sparkles,
                  title: 'Smart Formatting',
                  description: 'Automatically format and structure your questions for maximum clarity and impact.'
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-orange-600 transition-all hover:shadow-xl hover:shadow-orange-600/10">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 group-hover:bg-orange-600 transition-colors flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple steps to better questions
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: '01',
                  title: 'Type Your Question',
                  description: 'Start with what you want to know. Don\'t worry about perfection.'
                },
                {
                  step: '02',
                  title: 'Get AI Refinements',
                  description: 'Our AI analyzes and suggests improvements to make your question clearer.'
                },
                {
                  step: '03',
                  title: 'Ask With Confidence',
                  description: 'Share your refined question and get better, more meaningful answers.'
                }
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="text-8xl font-bold text-orange-200 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 -right-6 w-12">
                      <ArrowRight className="w-8 h-8 text-orange-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to transform your questions?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of users who are already asking better questions and getting better answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-orange-700 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-orange-600/30">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-orange-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-all">
                Learn More
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {['No credit card required', 'Free forever plan', '2-minute setup'].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-7 h-7 text-orange-600" strokeWidth={2.5} />
                <span className="text-xl font-bold">askQ</span>
              </div>
              <p className="text-gray-400 text-sm">
                Ask better questions, get better answers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>2024 askQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
