import { motion } from 'framer-motion';
import { Award, Heart, Users, Package } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-8 text-4xl font-bold tracking-tight">About Us</h1>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 grid gap-6 sm:grid-cols-2"
        >
          <div className="rounded-lg border bg-card p-6">
            <Award className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-xl font-bold">Quality First</h2>
            <p className="text-muted-foreground">
              We carefully curate every product to ensure premium quality and customer satisfaction.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Heart className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-xl font-bold">Customer Focus</h2>
            <p className="text-muted-foreground">
              Your satisfaction is our top priority. We're always here to help you find what you need.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Users className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-xl font-bold">Trusted Community</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers who trust us for their shopping needs.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Package className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-xl font-bold">Fast Delivery</h2>
            <p className="text-muted-foreground">
              We offer quick and reliable shipping to get your products to you fast.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border bg-muted/30 p-8 text-center"
        >
          <h2 className="mb-4 text-2xl font-bold">Our Values</h2>
          <div className="grid gap-4 text-left sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">Transparency</h3>
              <p className="text-sm text-muted-foreground">Clear pricing and honest communication</p>
            </div>
            <div>
              <h3 className="font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">Continuously improving our platform</p>
            </div>
            <div>
              <h3 className="font-semibold">Sustainability</h3>
              <p className="text-sm text-muted-foreground">Committed to eco-friendly practices</p>
            </div>
            <div>
              <h3 className="font-semibold">Excellence</h3>
              <p className="text-sm text-muted-foreground">Striving for perfection in everything we do</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
