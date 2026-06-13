'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditCaseStudyForm({ caseStudy }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: caseStudy.title || '',
        slug: caseStudy.slug || '',
        client: caseStudy.client || '',
        category: caseStudy.category || '',
        description: caseStudy.description || '',
        challenge: caseStudy.challenge || '',
        solution: caseStudy.solution || '',
        results: caseStudy.results || '',
        featured_image: caseStudy.featured_image || '',
        gallery_images: caseStudy.gallery_images ? caseStudy.gallery_images.join('\n') : '',
        tags: caseStudy.tags ? caseStudy.tags.join(', ') : '',
        published: caseStudy.published || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const tags = formData.tags
                .split(',')
                .map(t => t.trim())
                .filter(Boolean);

            const gallery_images = formData.gallery_images
                .split('\n')
                .map(img => img.trim())
                .filter(Boolean);

            const res = await fetch(`/api/case-studies/${caseStudy.slug}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags,
                    gallery_images,
                }),
            });

            if (res.ok) {
                router.push('/dashboard/case-studies');
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Error: ${error.error || 'Failed to update case study'}`);
            }
        } catch (error) {
            alert('Failed to update case study');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/case-studies"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Case Study</h1>
                    <p className="text-gray-500">Update case study details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                URL Slug *
                            </label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Warning: Changing the slug will break existing links
                            </p>
                        </div>
                    </div>

                    {/* Client & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                                Client *
                            </label>
                            <input
                                type="text"
                                id="client"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Challenge */}
                    <div>
                        <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                            The Challenge *
                        </label>
                        <textarea
                            id="challenge"
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Solution */}
                    <div>
                        <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-2">
                            Our Solution *
                        </label>
                        <textarea
                            id="solution"
                            name="solution"
                            value={formData.solution}
                            onChange={handleChange}
                            required
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Results */}
                    <div>
                        <label htmlFor="results" className="block text-sm font-medium text-gray-700 mb-2">
                            The Results *
                        </label>
                        <textarea
                            id="results"
                            name="results"
                            value={formData.results}
                            onChange={handleChange}
                            required
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            id="featured_image"
                            name="featured_image"
                            value={formData.featured_image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label htmlFor="gallery_images" className="block text-sm font-medium text-gray-700 mb-2">
                            Gallery Images (one URL per line)
                        </label>
                        <textarea
                            id="gallery_images"
                            name="gallery_images"
                            value={formData.gallery_images}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {/* Published */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-700">
                            Published
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-100">
                    <Link
                        href="/dashboard/case-studies"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
