import ClientForm from './ClientForm'

export const metadata = {
  title: 'Create Client | MadGraphix',
}

export default function NewClientPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Client</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Set up a new client account. An email and password are required for them to log into the client dashboard.
        </p>
      </div>
      <ClientForm />
    </div>
  )
}
