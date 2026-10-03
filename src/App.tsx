import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AppLayout } from '@/components/layout/AppLayout'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import Categories from '@/pages/Categories'
import Catalog from '@/pages/Catalog'
import TemplateDetail from '@/pages/TemplateDetail'
import Pricing from '@/pages/Pricing'
import Faq from '@/pages/Faq'
import NotFound from '@/pages/NotFound'

import Dashboard from '@/pages/Dashboard'
import CreateLetter from '@/pages/CreateLetter'
import History from '@/pages/History'
import LetterView from '@/pages/LetterView'
import Favorites from '@/pages/Favorites'
import Account from '@/pages/Account'
import Settings from '@/pages/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<Catalog />} />
          <Route path="/modeles" element={<Catalog />} />
          <Route path="/modeles/:templateId" element={<TemplateDetail />} />
          <Route path="/tarifs" element={<Pricing />} />
          <Route path="/faq" element={<Faq />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="creer/:templateId" element={<CreateLetter />} />
          <Route path="mes-lettres" element={<History />} />
          <Route path="lettres/:letterId" element={<LetterView />} />
          <Route path="favoris" element={<Favorites />} />
          <Route path="mon-compte" element={<Account />} />
          <Route path="parametres" element={<Settings />} />
        </Route>

        <Route path="*" element={<PublicLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
