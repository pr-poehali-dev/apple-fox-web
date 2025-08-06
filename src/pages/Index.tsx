import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const products = [
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      category: 'iPhone',
      price: '99 990 ₽',
      originalPrice: '109 990 ₽',
      image: '/img/73070195-b7e8-4842-a1e0-9791e509bc39.jpg',
      specs: ['A17 Pro чип', '6.1" дисплей', '128GB', 'Титан'],
      colors: ['Натуральный титан', 'Голубой титан', 'Белый титан', 'Чёрный титан']
    },
    {
      id: 'ipad-pro',
      name: 'iPad Pro',
      category: 'iPad',
      price: '84 990 ₽',
      originalPrice: '94 990 ₽',
      image: '/img/c31ffa7a-dcd7-45b9-94b1-fd69fe1f153d.jpg',
      specs: ['M2 чип', '11" дисплей', '128GB', 'WiFi + Cellular'],
      colors: ['Серый космос', 'Серебристый']
    },
    {
      id: 'macbook-pro',
      name: 'MacBook Pro',
      category: 'Mac',
      price: '199 990 ₽',
      originalPrice: '219 990 ₽',
      image: '/img/9bbcb0a3-3b7d-40bd-8616-68409795d7ed.jpg',
      specs: ['M3 Pro чип', '14" дисплей', '512GB SSD', '18GB RAM'],
      colors: ['Серый космос', 'Серебристый']
    },
    {
      id: 'airpods-pro',
      name: 'AirPods Pro',
      category: 'Аксессуары',
      price: '24 990 ₽',
      originalPrice: '29 990 ₽',
      image: '/placeholder.svg',
      specs: ['Активное шумоподавление', 'Прозрачность', 'Пространственное аудио', 'MagSafe'],
      colors: ['Белый']
    }
  ];

  const addToCompare = (productId: string) => {
    if (!compareItems.includes(productId) && compareItems.length < 3) {
      setCompareItems([...compareItems, productId]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(compareItems.filter(id => id !== productId));
  };

  const getCompareProducts = () => {
    return products.filter(product => compareItems.includes(product.id));
  };

  const categories = [
    { name: 'iPhone', icon: 'Smartphone', count: '15 моделей' },
    { name: 'iPad', icon: 'Tablet', count: '8 моделей' },
    { name: 'Mac', icon: 'Laptop', count: '12 моделей' },
    { name: 'Аксессуары', icon: 'Headphones', count: '50+ товаров' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Apple" size={28} className="text-black" />
                <span className="text-2xl font-bold text-black tracking-tight">AppleFox</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#catalog" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
                <a href="#iphone" className="text-gray-600 hover:text-black transition-colors">iPhone</a>
                <a href="#ipad" className="text-gray-600 hover:text-black transition-colors">iPad</a>
                <a href="#mac" className="text-gray-600 hover:text-black transition-colors">Mac</a>
                <a href="#accessories" className="text-gray-600 hover:text-black transition-colors">Аксессуары</a>
                <a href="#support" className="text-gray-600 hover:text-black transition-colors">Поддержка</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    Сравнить
                    {compareItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center">
                        {compareItems.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Сравнение товаров</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {getCompareProducts().length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Добавьте товары для сравнения</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {getCompareProducts().map((product) => (
                          <div key={product.id} className="space-y-4">
                            <div className="relative">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-contain rounded-lg bg-gray-50"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCompare(product.id)}
                                className="absolute top-2 right-2"
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-2xl font-bold text-black">{product.price}</p>
                            </div>
                            <div className="space-y-2">
                              {product.specs.map((spec, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <Icon name="Check" size={14} className="mr-2 text-green-600" />
                                  {spec}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="sm">
                <Icon name="ShoppingBag" size={16} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 tracking-tight">
              AppleFox
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Официальные продукты Apple с гарантией качества. 
              Быстрая доставка по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-black text-black hover:bg-black hover:text-white">
                <Icon name="Play" size={20} className="mr-2" />
                Посмотреть видео
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="catalog" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Каталог продуктов</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Выберите категорию продуктов Apple для поиска идеального устройства
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-white">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 p-4 bg-white rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                    <Icon name={category.icon as any} size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Популярные товары</h2>
            <p className="text-gray-600 text-lg">Самые востребованные продукты Apple</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                <div className="relative p-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-500">
                    Скидка
                  </Badge>
                </div>
                <CardContent className="p-6 pt-0">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-black mb-2">{product.name}</h3>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-bold text-black">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {product.specs.slice(0, 2).map((spec, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Icon name="Check" size={14} className="mr-2 text-green-600" />
                        {spec}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => addToCompare(product.id)}
                      disabled={compareItems.includes(product.id) || compareItems.length >= 3}
                      className="flex-1"
                    >
                      <Icon name="BarChart3" size={14} className="mr-1" />
                      {compareItems.includes(product.id) ? 'В сравнении' : 'Сравнить'}
                    </Button>
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Store */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-6">О магазине AppleFox</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Мы — авторизованный партнёр Apple с 2015 года. Предлагаем только оригинальные продукты 
              с официальной гарантией. Наша команда экспертов поможет выбрать идеальное устройство 
              для ваших потребностей.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-50 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Официальная гарантия</h3>
                <p className="text-gray-600">До 2 лет гарантии Apple</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Быстрая доставка</h3>
                <p className="text-gray-600">По Москве в день заказа</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Поддержка 24/7</h3>
                <p className="text-gray-600">Консультации в любое время</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Доставка и гарантия</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="MapPin" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Доставка по России</h3>
                    <p className="text-gray-600">Курьерская доставка в день заказа по Москве. По регионам 1-3 дня.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="CreditCard" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Удобная оплата</h3>
                    <p className="text-gray-600">Наличными, картой, рассрочка 0% до 24 месяцев.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="RotateCcw" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Возврат 14 дней</h3>
                    <p className="text-gray-600">Полный возврат средств в течение 14 дней без лишних вопросов.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="MapPin" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Адрес магазина</h3>
                    <p className="text-gray-600">Москва, ул. Тверская, 12<br />Ежедневно с 10:00 до 22:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="Phone" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Телефон</h3>
                    <p className="text-gray-600">+7 (495) 123-45-67<br />Звонок бесплатный</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-black rounded-full p-2 mt-1">
                    <Icon name="Mail" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p className="text-gray-600">info@applefox.ru<br />Ответим в течение часа</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Apple" size={24} className="text-white" />
                <span className="text-xl font-bold">AppleFox</span>
              </div>
              <p className="text-gray-400 mb-4">
                Официальный партнёр Apple. Оригинальные продукты с гарантией качества.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продукты</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">iPhone</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">iPad</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mac</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Аксессуары</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Доставка</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Гарантия</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Возврат</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Контакты</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
            </div>
          </div>
          <Separator className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AppleFox. Все права защищены.
            </p>
            <p className="text-gray-400 text-sm">
              Политика конфиденциальности | Условия использования
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;