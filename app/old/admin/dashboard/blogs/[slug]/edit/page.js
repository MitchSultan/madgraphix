import { supabaseServer } from '../../../../../lib/supabase/server';
import { notFound } from 'next/navigation';
import EditBlogForm from './EditBlogForm';

async function getBlog(slug) {
  const supabase = await supabaseServer();
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !blog) {
    return null;
  }
  
  return blog;
}

export default async function EditBlogPage(props) {
  const params = await props.params;
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}
