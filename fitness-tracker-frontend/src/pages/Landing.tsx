import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import workoutImage from "../images/workoutImage.jpg";


const Landing: React.FC = () => {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content container">
          <div className="hero-text">
            <h1 className="hero-title">
              Transform Your
              <span className="text-gradient glow"> Fitness Journey</span>
            </h1>
            <p className="hero-subtitle">
              Track workouts, crush goals, and become the strongest version of yourself.
              Your personal fitness companion powered by smart tracking.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Free Today 🚀
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">8K+</div>
                <div className="stat-label">Workouts Logged</div>
              </div>
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
                <div className="phone-mockup">
                <div className="phone-frame">
                <div className="phone-screen">
                    <img
                        src={workoutImage}
                    alt="Workout in progress"
                    className="phone-workout-image"
                    />
                    </div>
            </div>
          </div>
        </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="section-subtitle">
              Powerful features designed to help you reach your fitness goals faster
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Tracking</h3>
              <p>Log every rep, set, and weight with our intuitive interface. Track your progress over time.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Analytics</h3>
              <p>Visualize your gains with detailed charts and statistics. See how far you've come.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal Setting</h3>
              <p>Set ambitious goals and track your journey. Stay motivated with milestone celebrations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Logging</h3>
              <p>Add workouts in seconds. No complicated forms or unnecessary steps.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and private. We never share your information.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access from any device. Seamless experience on phone, tablet, or desktop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Get Started in <span className="text-gradient">3 Simple Steps</span>
            </h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Account</h3>
                <p>Sign up in seconds. No credit card required.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Log Your First Workout</h3>
                <p>Add exercises, sets, reps, and weights.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Track Your Progress</h3>
                <p>Watch your strength grow week after week.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Loved by <span className="text-gradient">Fitness Enthusiasts</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "This app completely changed how I track my workouts. Simple, fast, and effective!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">💪</div>
                <div>
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-title">Powerlifter</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Finally, a workout tracker that doesn't overcomplicate things. Love the clean interface!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">🏋️</div>
                <div>
                  <div className="author-name">Mike Chen</div>
                  <div className="author-title">Bodybuilder</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The progress tracking is amazing. Seeing my gains visualized keeps me motivated!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">🔥</div>
                <div>
                  <div className="author-name">Emily Rodriguez</div>
                  <div className="author-title">CrossFit Athlete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Start Your <span className="text-gradient">Transformation?</span>
            </h2>
            <p className="cta-subtitle">
              Join thousands of users who are crushing their fitness goals
            </p>
            <Link to="/register" className="btn btn-primary btn-xlarge">
              Get Started Free 🚀
            </Link>
            <p className="cta-note">No credit card required • Start tracking in 30 seconds</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">💪</span>
                <span className="logo-text">Fitness Tracker</span>
              </div>
              <p>Transform your body, transform your life.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#testimonials">Testimonials</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Fitness Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;