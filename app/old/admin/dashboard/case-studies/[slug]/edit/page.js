import { supabaseServer } from '../../../../../lib/supabase/server';
import { notFound } from 'next/navigation';
import EditCaseStudyForm from './EditCaseStudyForm';

async function getCaseStudy(slug) {
  const supabase = await supabaseServer();
  
  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !caseStudy) {
    return null;
  }
  
  return caseStudy;
}

export default async function EditCaseStudyPage(props) {
  const params = await props.params;
  const { slug } = params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return <EditCaseStudyForm caseStudy={caseStudy} />;
}
