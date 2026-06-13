import { Outfit } from 'next/font/google';


const outfit = Outfit({
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}) {
  return (
    <>
      <div className={`${outfit.className} dark:bg-gray-900`}>
        
          <div>{children}</div>
        
      </div>
    </>
  );
}
