"use client"

import { motion } from "framer-motion"

export function OurStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
          <p className="text-xl mb-12 text-muted-foreground">
            From a small fleet to Kenya premier vehicle hiring service
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">2010</h3>
            <p className="text-muted-foreground">
              Gariflex founded with a vision to revolutionize vehicle hiring in Kenya
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">2015</h3>
            <p className="text-muted-foreground">
              Expanded to major cities across Kenya, introducing a diverse fleet of vehicles
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">2023</h3>
            <p className="text-muted-foreground">
              Launched innovative digital platform, setting new standards in customer experience
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

