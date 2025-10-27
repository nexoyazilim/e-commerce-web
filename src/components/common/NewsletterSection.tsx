import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfettiEffect } from "./ConfettiEffect"

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setSubscribed(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <ConfettiEffect trigger={showConfetti} />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: subscribed ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
          </motion.div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-2">{t('home.newsletter.thankYou')}</h2>
              <p className="text-muted-foreground">
                {t('home.newsletter.thankYouDesc')}
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">{t('home.newsletter.title')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('home.newsletter.desc')}
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={t('home.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit">
                  {t('actions.subscribe')}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

