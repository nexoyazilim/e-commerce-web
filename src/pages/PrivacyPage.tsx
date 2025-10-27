import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Lock className="h-6 w-6 text-primary" />
              Information We Collect
            </h2>
            <p className="mb-4 text-muted-foreground">
              We collect information that you provide to us directly, including but not limited to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Account information and preferences</li>
              <li>Payment information for processing orders</li>
              <li>Shipping and billing addresses</li>
              <li>Product reviews and feedback</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Eye className="h-6 w-6 text-primary" />
              How We Use Your Information
            </h2>
            <p className="mb-4 text-muted-foreground">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders and account</li>
              <li>To improve our website and services</li>
              <li>To send you promotional materials and updates (with your consent)</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6 text-primary" />
              Data Security
            </h2>
            <p className="mb-4 text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-primary" />
              Your Rights
            </h2>
            <p className="mb-4 text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@example.com
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

