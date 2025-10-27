import { motion } from 'framer-motion';
import { Ruler, Shirt, Footprints } from 'lucide-react';

export function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Ruler className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Size Guide</h1>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <Shirt className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Clothing Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Size</th>
                    <th className="p-3 text-left font-semibold">Chest (cm)</th>
                    <th className="p-3 text-left font-semibold">Waist (cm)</th>
                    <th className="p-3 text-left font-semibold">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">S</td>
                    <td className="p-3">90-96</td>
                    <td className="p-3">80-86</td>
                    <td className="p-3">68-70</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">M</td>
                    <td className="p-3">96-102</td>
                    <td className="p-3">86-92</td>
                    <td className="p-3">70-72</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">L</td>
                    <td className="p-3">102-108</td>
                    <td className="p-3">92-98</td>
                    <td className="p-3">72-74</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">XL</td>
                    <td className="p-3">108-114</td>
                    <td className="p-3">98-104</td>
                    <td className="p-3">74-76</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <Footprints className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Shoe Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">EU Size</th>
                    <th className="p-3 text-left font-semibold">UK Size</th>
                    <th className="p-3 text-left font-semibold">US Size</th>
                    <th className="p-3 text-left font-semibold">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">39</td>
                    <td className="p-3">6</td>
                    <td className="p-3">7</td>
                    <td className="p-3">24.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">40</td>
                    <td className="p-3">6.5</td>
                    <td className="p-3">7.5</td>
                    <td className="p-3">25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">41</td>
                    <td className="p-3">7.5</td>
                    <td className="p-3">8.5</td>
                    <td className="p-3">25.5</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">42</td>
                    <td className="p-3">8</td>
                    <td className="p-3">9</td>
                    <td className="p-3">26</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

