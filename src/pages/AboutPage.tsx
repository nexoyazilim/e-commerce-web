import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Heart, Users, Package, TrendingUp, Globe, ShieldCheck, Target } from 'lucide-react';

export function AboutPage() {
  const { t } = useTranslation();
  const timeline = [
    { year: '2020', title: t('pages.about.timeline2020'), description: t('pages.about.timeline2020Desc') },
    { year: '2021', title: t('pages.about.timeline2021'), description: t('pages.about.timeline2021Desc') },
    { year: '2022', title: t('pages.about.timeline2022'), description: t('pages.about.timeline2022Desc') },
    { year: '2023', title: t('pages.about.timeline2023'), description: t('pages.about.timeline2023Desc') },
    { year: '2024', title: t('pages.about.timeline2024'), description: t('pages.about.timeline2024Desc') },
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
    { number: '10M+', label: t('pages.about.stats.customers'), icon: Users },
    { number: '150+', label: t('pages.about.stats.countries'), icon: Globe },
    { number: '500k+', label: t('pages.about.stats.products'), icon: Package },
    { number: '99.9%', label: t('pages.about.stats.uptime'), icon: ShieldCheck },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl"
      >
        <h1 className="mb-8 text-4xl font-bold tracking-tight">{t('pages.about.title')}</h1>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <p className="mb-4 text-lg text-muted-foreground">
            {t('pages.about.intro')}
          </p>
          <p className="text-lg text-muted-foreground">
            {t('pages.about.mission')}
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
            <h2 className="mb-3 text-2xl font-bold">{t('pages.about.missionTitle')}</h2>
            <p className="text-muted-foreground">
              {t('pages.about.missionDesc')}
            </p>
          </div>
          <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <TrendingUp className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-3 text-2xl font-bold">{t('pages.about.visionTitle')}</h2>
            <p className="text-muted-foreground">
              {t('pages.about.visionDesc')}
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
          <h2 className="mb-6 text-3xl font-bold text-center">{t('pages.about.achievements')}</h2>
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
          <h2 className="mb-8 text-3xl font-bold text-center">{t('pages.about.journey')}</h2>
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
          <h2 className="mb-8 text-3xl font-bold text-center">{t('pages.about.teamTitle')}</h2>
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
          <h2 className="mb-6 text-3xl font-bold text-center">{t('pages.about.whyChooseUs')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Award className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">{t('pages.about.qualityFirst')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pages.about.qualityFirstDesc')}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Heart className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">{t('pages.about.customerFocus')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pages.about.customerFocusDesc')}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Users className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">{t('pages.about.trustedCommunity')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pages.about.trustedCommunityDesc')}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg">
              <Package className="mx-auto mb-3 h-12 w-12 text-primary" />
              <h3 className="mb-2 font-bold">{t('pages.about.fastDelivery')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('pages.about.fastDeliveryDesc')}
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
          <h2 className="mb-6 text-center text-3xl font-bold">{t('pages.about.valuesTitle')}</h2>
          <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                {t('pages.about.transparency')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('pages.about.transparencyDesc')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('pages.about.innovation')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('pages.about.innovationDesc')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {t('pages.about.sustainability')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('pages.about.sustainabilityDesc')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {t('pages.about.excellence')}
              </h3>
              <p className="text-sm text-muted-foreground">{t('pages.about.excellenceDesc')}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
