-- ============================================
-- CASE STUDIES TABLE SCHEMA
-- ============================================

-- Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    featured_image TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON public.case_studies(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON public.case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON public.case_studies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_tags ON public.case_studies USING GIN(tags);

-- ============================================
-- TRIGGERS
-- ============================================

-- Update updated_at on case study updates
DROP TRIGGER IF EXISTS update_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Helper function to check if user is admin (create if not exists)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read published case studies
DROP POLICY IF EXISTS "Anyone can read published case studies" ON public.case_studies;
CREATE POLICY "Anyone can read published case studies" ON public.case_studies
    FOR SELECT USING (published = TRUE);

-- Admins can read all case studies (including drafts)
DROP POLICY IF EXISTS "Admins can read all case studies" ON public.case_studies;
CREATE POLICY "Admins can read all case studies" ON public.case_studies
    FOR SELECT USING (is_admin());

-- Admins can insert case studies
DROP POLICY IF EXISTS "Admins can insert case studies" ON public.case_studies;
CREATE POLICY "Admins can insert case studies" ON public.case_studies
    FOR INSERT WITH CHECK (is_admin());

-- Admins can update case studies
DROP POLICY IF EXISTS "Admins can update case studies" ON public.case_studies;
CREATE POLICY "Admins can update case studies" ON public.case_studies
    FOR UPDATE USING (is_admin());

-- Admins can delete case studies
DROP POLICY IF EXISTS "Admins can delete case studies" ON public.case_studies;
CREATE POLICY "Admins can delete case studies" ON public.case_studies
    FOR DELETE USING (is_admin());

-- ============================================
-- SEED DATA - Mock Case Studies
-- ============================================

INSERT INTO public.case_studies (title, slug, client, category, description, challenge, solution, results, featured_image, gallery_images, tags, published, created_at) VALUES
(
    'E-Commerce Platform Redesign for The Other Guys Kenya',
    'the-other-guys-kenya-ecommerce-redesign',
    'The Other Guys Kenya',
    'E-Commerce & Web Development',
    'Complete redesign and development of an e-commerce platform for The Other Guys Kenya, transforming their online presence and boosting sales.',
    E'The Other Guys Kenya was struggling with an outdated e-commerce platform that suffered from:\n\n- Poor mobile responsiveness affecting 65% of their traffic\n- Slow page load times (5-8 seconds average)\n- Confusing checkout process with 40% cart abandonment rate\n- Limited product filtering and search functionality\n- Outdated design that didn''t reflect their premium brand image\n- No analytics or insights into customer behavior',
    E'We delivered a comprehensive solution that addressed all pain points:\n\n**Modern Tech Stack:**\n- Built with Next.js for optimal performance and SEO\n- Implemented server-side rendering for instant page loads\n- Integrated Stripe for seamless payment processing\n- Connected to Supabase for real-time inventory Management\n\n**UX/UI Improvements:**\n- Redesigned mobile-first interface with intuitive navigation\n- Streamlined checkout to just 3 steps\n- Advanced filtering with instant search results\n- High-quality product photography and 360° views\n- Personalized product recommendations\n\n**Performance Optimization:**\n- Implemented lazy loading and code splitting\n- Optimized images with WebP format\n- CDN integration for global delivery\n- Achieved 95+ Lighthouse scores across all metrics',
    E'The redesigned platform delivered exceptional results within 3 months:\n\n**Performance Metrics:**\n- Page load time reduced to 1.2 seconds (83% improvement)\n- Mobile traffic increased by 45%\n- Cart abandonment dropped to 12% (70% improvement)\n- Bounce rate decreased by 35%\n\n**Business Impact:**\n- Online sales increased by 180%\n- Average order value up by 25%\n- Customer acquisition cost reduced by 40%\n- Customer satisfaction score improved from 3.2 to 4.7/5\n\n**SEO & Traffic:**\n- Organic traffic increased by 220%\n- Ranked #1 for 15 key product categories\n- Featured snippets for 8 high-value keywords\n\n"The new platform has completely transformed our business. We''re now competing with international brands and winning." - Michael Omondi, CEO',
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    ARRAY[
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'
    ],
    ARRAY['e-commerce', 'web development', 'Next.js', 'UX/UI', 'performance optimization'],
    TRUE,
    NOW() - INTERVAL '60 days'
),
(
    'Brand Identity & Marketing Campaign for TechStart Innovation Hub',
    'techstart-innovation-hub-branding',
    'TechStart Innovation Hub',
    'Branding & Marketing',
    'Complete brand identity development and multi-channel marketing campaign for a technology innovation hub launching in Nairobi.',
    E'TechStart Innovation Hub needed to establish a strong brand presence before their launch:\n\n- No existing brand identity or guidelines\n- Competing with 5 established innovation hubs in the market\n- Target audience unclear on value proposition\n- Limited budget for marketing and advertising\n- Need to attract both startups and corporate partners\n- 3-month timeline to launch event',
    E'We developed a comprehensive brand and marketing strategy:\n\n**Brand Identity:**\n- Created modern, tech-forward logo with flexible mark\n- Developed vibrant color palette appealing to innovators\n- Designed comprehensive brand guidelines (60+ pages)\n- Created brand voice and messaging framework\n- Produced marketing collateral suite (business cards, letterheads, presentations)\n\n**Visual Assets:**\n- Photographed the physical space with professional lighting\n- Created 3D renders of planned facility upgrades\n- Designed iconography set for services and amenities\n- Developed social media templates and graphics\n\n** Marketing Campaign:**\n- Multi-channel strategy across digital and physical touchpoints\n- Social media campaign with teaser content\n- Email nurture sequence for early adopters\n- Partnership outreach materials\n- Event branding for launch celebration\n- Website with booking system',
    E'The brand launch exceeded all expectations:\n\n**Launch Event:**\n- 500+ attendees at launch event (target was 200)\n- 15 media outlets covered the opening\n- 3 corporate partnership agreements signed on-site\n\n**Brand Awareness:**\n- Achieved 85% brand recognition in target market within 2 months\n- Social media following grew to 10,000+ across platforms\n- Featured in 3 major tech publications\n- Brand mentioned 200+ times online in first month\n\n**Business Results:**\n- 45 startups joined in first quarter (capacity: 50)\n- Waiting list of 30+ companies\n- Revenue targets exceeded by 60%\n- 92% member satisfaction score\n\n**Industry Recognition:**\n- Finalist for "Best New Innovation Space" award\n- Featured case study in Marketing Week Kenya\n\n"MAD Graphix didn''t just design a logo - they built our entire brand DNA. Their work directly contributed to our success." - Sarah Njeri, Founder',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    ARRAY[
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
        'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg'
    ],
    ARRAY['branding', 'marketing', 'brand identity', 'launch campaign', 'design'],
    TRUE,
    NOW() - INTERVAL '45 days'
),
(
    'Mobile App Development for FitTrack Wellness',
    'fittrack-wellness-mobile-app',
    'FitTrack Wellness',
    'Mobile App Development',
    'Design and development of a comprehensive fitness tracking mobile app with AI-powered coaching features.',
    E'FitTrack Wellness wanted to enter the competitive fitness app market:\n\n- Saturated market with established players (MyFitnessPal, Strava)\n- Need to differentiate with unique value proposition\n- Complex requirements: workout tracking, nutrition, community features\n- Must work offline and sync seamlessly\n- Target both iOS and Android with limited budget\n- Requirement for AI-powered personalized recommendations\n- HIPAA compliance for health data',
    E'We built a feature-rich app using modern cross-platform technology:\n\n**Technical Implementation:**\n- React Native for cross-platform development (80% code sharing)\n- AI/ML integration for personalized workout recommendations\n- Offline-first architecture with background sync\n- Integration with Apple Health Kit and Google Fit\n- Real-time analytics dashboard\n- Secure cloud infrastructure on AWS\n\n**Key Features:**\n- AI workout coach that adapts to user progress\n- Barcode scanning for nutrition tracking\n- Social features with challenges and leaderboards\n- Video exercise library with 500+ workouts\n- Custom meal planning with dietary preferences\n- Wearable device integration\n- In-app purchases for premium features\n\n**Design Excellence:**\n- Clean, motivating UI with smooth animations\n- Dark mode support\n- Accessibility features for visually impaired users\n- Haptic feedback for milestone celebrations',
    E'The app became a market success within 6 months:\n\n**User Adoption:**\n- 50,000 downloads in first 3 months\n- 4.8/5 average rating on App Store\n- 4.7/5 average rating on Google Play\n- 35% conversion to premium subscription\n- 70% 30-day retention rate (industry average: 25%)\n\n**Technical Performance:**\n- 99.9% uptime since launch\n- Average app load time: 0.8 seconds\n- Crash rate below 0.1%\n- Successfully handling 500+ concurrent users\n\n**Business Metrics:**\n- $250,000 revenue in first 6 months\n- Featured by Apple in "Apps We Love"\n- Featured by Google in "Hidden Gems"\n- Acquired 10,000 premium subscribers\n- Average session time: 12 minutes\n\n**User Impact:**\n- Users report average weight loss of 8kg in 3 months\n- 85% of users achieved their fitness goals\n- Community created 200+ user-generated challenges\n\n"MAD Graphix built us an app that users love and actually use. The AI coaching feature is a game-changer." - David Kimani, CEO',
    'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg',
    ARRAY[
        'https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg',
        'https://images.pexels.com/photos/4162485/pexels-photo-4162485.jpeg',
        'https://images.pexels.com/photos/3768582/pexels-photo-3768582.jpeg'
    ],
    ARRAY['mobile app', 'React Native', 'AI/ML', 'fitness', 'health tech'],
    TRUE,
    NOW() - INTERVAL '30 days'
),
(
    'SEO & Content Strategy for EduLearn Africa',
    'edulearn-africa-seo-content-strategy',
    'EduLearn Africa',
    'SEO & Content Marketing',
    'Comprehensive SEO optimization and content marketing strategy for an online education platform targeting African students.',
    E'EduLearn Africa faced significant digital visibility challenges:\n\n- Zero organic search traffic despite quality content\n- No rankings for key educational keywords\n- Competing against established international platforms\n- Technical SEO issues preventing indexation\n- Limited content marketing resources\n- Need to build authority in education sector\n- Budget constraints for paid advertising',
    E'We implemented a data-driven SEO and content strategy:\n\n**Technical SEO Audit & Fixes:**\n- Fixed 200+ crawl errors and broken links\n- Implemented proper schema markup for courses\n- Optimized site architecture and URL structure\n- Improved site speed from 6s to 1.5s load time\n- Mobile optimization achieving 95+ mobile score\n- Fixed duplicate content issues\n- Implemented comprehensive XML sitemaps\n\n**Content Strategy:**\n- Keyword research identifying 500+ target terms\n- Created content pillars around 10 main topics\n- Developed 80+ detailed course landing pages\n- Published 60 high-quality blog posts\n- Created downloadable resources and guides\n- Developed country-specific content for 8 markets\n\n**Link Building:**\n- Earned backlinks from 40+ education websites\n- Guest posting on authoritative edu sites\n- Digital PR securing mentions in 15 publications\n- Strategic partnerships with universities\n\n**Local SEO:**\n- Google Business Profile optimization\n- Local directory listings\n- Location-specific landing pages',
    E'The SEO strategy delivered transformative results in 9 months:\n\n**Traffic Growth:**\n- Organic traffic increased from 200 to 45,000 monthly visitors (22,400% growth)\n- Page 1 rankings for 250+ keywords\n- Featured snippets for 30 high-value terms\n- Average position improved from 45 to 8\n\n**Visibility Metrics:**\n- Domain authority increased from 12 to 42\n- 500+ referring domains acquired\n- Visibility score increased by 1,800%\n- Indexed pages grew from 50 to 400\n\n**Business Impact:**\n- Course enrollments up 320%\n- Cost per acquisition reduced by 65%\n- Organic search now 70% of total traffic\n- Email list grew from 500 to 25,000 subscribers\n- Revenue from organic traffic: $180,000 in 6 months\n\n**Content Performance:**\n- Average blog session time: 4.5 minutes\n- 15 blog posts ranking in top 3\n- Content shared  5,000+ times on social media\n- Featured in Google Discover 40+ times\n\n"We went from invisible to dominating search results in our niche. MAD Graphix''s strategy was worth every shilling." - Grace Mutua, Marketing Director',
    'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg',
    ARRAY[
        'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg',
        'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
    ],
    ARRAY['SEO', 'content marketing', 'digital marketing', 'education', 'organic growth'],
    TRUE,
    NOW() - INTERVAL '15 days'
)
ON CONFLICT (slug) DO NOTHING;
