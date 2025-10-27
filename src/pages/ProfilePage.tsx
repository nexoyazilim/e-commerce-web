import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, ShoppingBag, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderCard } from '@/components/profile/OrderCard';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function ProfilePage() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const orders = useOrderStore((state) => state.orders);
  const clearCart = useCartStore((state) => state.clearCart);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSaveProfile = () => {
    updateUser(userInfo);
    toast.success(t('pages.profile.profileUpdated'));
  };

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success(t('pages.profile.loggedOut'));
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md text-center"
        >
          <User className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">{t('pages.profile.loginRequired')}</h1>
          <p className="mb-6 text-muted-foreground">{t('pages.profile.pleaseLogin')}</p>
          <Button onClick={() => useAuthStore.getState().login('demo@example.com', 'password')}>
            {t('pages.profile.loginDemo')}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('pages.profile.title')}</h1>
            <p className="text-muted-foreground">{t('pages.profile.manageAccount')}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {t('pages.profile.logout')}
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            {t('pages.profile.accountInfo')}
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t('pages.profile.myOrdersCount', { count: orders.length })}
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="mr-2 h-4 w-4" />
            {t('pages.profile.myAddresses')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl rounded-lg border bg-card p-6"
          >
            <h2 className="mb-6 text-xl font-bold">{t('pages.profile.accountInformation')}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">{t('pages.profile.name')}</label>
                <Input
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">{t('pages.profile.email')}</label>
                <Input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">{t('pages.profile.phone')}</label>
                <Input
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                />
              </div>
              <Button onClick={handleSaveProfile}>{t('pages.profile.saveChanges')}</Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            {orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">{t('pages.profile.noOrders')}</h3>
                <p className="mb-4 text-muted-foreground">{t('pages.profile.startShopping')}</p>
                <Button asChild>
                  <Link to="/products">{t('pages.cart.browseProducts')}</Link>
                </Button>
              </motion.div>
            ) : (
              orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl rounded-lg border bg-card p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{t('pages.profile.savedAddresses')}</h2>
              <Button size="sm">{t('pages.profile.addAddress')}</Button>
            </div>
            <div className="text-center py-8 text-muted-foreground">
              {t('pages.profile.noAddresses')}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
