import { motion } from 'framer-motion';
import { Scale, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Scale className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-primary" />
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <CheckCircle className="h-6 w-6 text-primary" />
              Use License
            </h2>
            <p className="mb-4 text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <AlertCircle className="h-6 w-6 text-primary" />
              Disclaimer
            </h2>
            <p className="text-muted-foreground">
              The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied,
              and hereby disclaim and negate all other warranties including without limitation, implied warranties or
              conditions of merchantability.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 text-2xl font-bold">Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall we be liable for any damages arising out of the use or inability to use the materials on this website.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold">Revisions</h2>
            <p className="text-muted-foreground">
              We may revise these terms of service at any time without notice. By using this website you are agreeing to be
              bound by the current version of these terms of service.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

