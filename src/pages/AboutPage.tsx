import { motion } from 'framer-motion';
import { Award, Heart, Users, Package, TrendingUp, Globe, ShieldCheck, Target } from 'lucide-react';

export function AboutPage() {
  const timeline = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize online shopping' },
    { year: '2021', title: 'First 10,000 Customers', description: 'Reached our first major milestone' },
    { year: '2022', title: 'International Expansion', description: 'Launched in 5 countries across Europe' },
    { year: '2023', title: 'Mobile App Launch', description: 'Introduced our mobile application' },
    { year: '2024', title: '1 Million Products', description: 'Expanded our catalog to over 1 million products' },
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { name: 'Michael Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Emily Rodriguez', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
    { name: 'David Kim', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    { name: 'Lisa Anderson', role: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
    { name: 'James Wilson', role: 'Head of Customer Success', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200' },
  ];

  const stats = [
    { number: '10M+', label: 'Happy Customers', icon: Users },
    { number: '150+', label: 'Countries Served', icon: Globe },
    { number: '500k+', label: 'Products Available', icon: Package },
    { number: '99.9%', label: 'Uptime Guarantee', icon: ShieldCheck },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl"
      >
        <h1 className="mb-8 text-4xl font-bold tracking-tight">About Us</h1>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <p className="mb-4 text-lg text-muted-foreground">
            Welcome to our premium e-commerce platform. We are dedicated to providing you with the
            highest quality products and exceptional shopping experiences.
          </p>
          <p className="text-lg text-muted-foreground">
            Our mission is to make online shopping simple, enjoyable, and accessible to everyone.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <Target className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-3 text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide exceptional online shopping experiences by offering quality products, competitive prices, 
              and outstanding customer service to customers worldwide.
            </p>
          </div>
          <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <TrendingUp className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-3 text-2xl font-bold">Our Vision</h2>
            <p className="text-muted-foreground">
              To become the world's most trusted and innovative e-commerce platform, setting new standards 
              for online retail and customer satisfaction.
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-3xl font-bold text-center">Our Achievements</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-primary" />
                <div className="mb-2 text-3xl font-bold">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="mb-8 text-3xl font-bold text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            {timeline.map((item, i) => (
              <div key={i} className="relative mb-8 flex items-start gap-4">
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">{item.year}</span>
                </div>
                <div className="flex-1 rounded-lg border bg-card p-4">
                  <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="mb-8 text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mb-1 font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-3xl font-bold text-center">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Award className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                We carefully curate every product to ensure premium quality and customer satisfaction.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Heart className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">Customer Focus</h3>
              <p className="text-sm text-muted-foreground">
                Your satisfaction is our top priority. We're always here to help you find what you need.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Users className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">Trusted Community</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of satisfied customers who trust us for their shopping needs.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Package className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                We offer quick and reliable shipping to get your products to you fast.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-8"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Transparency
              </h3>
              <p className="text-sm text-muted-foreground">Clear pricing and honest communication</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Innovation
              </h3>
              <p className="text-sm text-muted-foreground">Continuously improving our platform</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Sustainability
              </h3>
              <p className="text-sm text-muted-foreground">Committed to eco-friendly practices</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Excellence
              </h3>
              <p className="text-sm text-muted-foreground">Striving for perfection in everything we do</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
