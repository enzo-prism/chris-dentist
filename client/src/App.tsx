import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import HotjarTracking from "@/components/common/HotjarTracking";
import SitemapLink from "@/components/common/SitemapLink";
import Redirects from "@/components/common/Redirects";
import Favicons from "@/components/common/Favicons";
import PreloadResources from "@/components/seo/PreloadResources";
import DomainRedirect from "@/components/seo/DomainRedirect";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import PatientResources from "@/pages/PatientResources";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Schedule from "@/pages/Schedule";
import ThankYou from "@/pages/ThankYou";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import HipaaNotice from "@/pages/HipaaNotice";
import Accessibility from "@/pages/Accessibility";
import DentalVeneers from "@/pages/DentalVeneers";
import DentalImplants from "@/pages/DentalImplants";
import Invisalign from "@/pages/Invisalign";
import EmergencyDental from "@/pages/EmergencyDental";
import AnalyticsMinimal from "@/pages/AnalyticsMinimal";
import GATestPage from "@/pages/GATestPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PatientStories from "@/pages/PatientStories";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: 'var(--header-height, 112px)' }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/patient-resources" component={PatientResources} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/patient-stories" component={PatientStories} />
          <Route path="/contact" component={Contact} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/blog" component={Blog} />
          <Route path="/thank-you" component={ThankYou} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/hipaa" component={HipaaNotice} />
          <Route path="/accessibility" component={Accessibility} />
          <Route path="/dental-veneers" component={DentalVeneers} />
          <Route path="/dental-implants" component={DentalImplants} />
          <Route path="/invisalign" component={Invisalign} />
          <Route path="/emergency-dental" component={EmergencyDental} />
          <Route path="/analytics" component={AnalyticsMinimal} />
          <Route path="/ga-test" component={GATestPage} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <DomainRedirect />
        <GoogleAnalytics />
        <HotjarTracking />
        <SitemapLink />
        <Favicons />
        <Redirects />
        <PreloadResources />
        <Router />
        <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
