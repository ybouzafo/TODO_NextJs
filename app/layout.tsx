'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}




















// 'use client'

// // app/layout.tsx
// import './globals.css';
// import type { Metadata } from 'next';
// import ReactQueryDevtoolsWrapper from '../components/ReactQueryDevtoolsWrapper';
// import ReactQueryProvider from '../components/ReactQueryProvider';
// import ReduxProvider from '../components/ReduxProvider'; // Importez le ReduxProvider
// import ThemeWrapper from '../components/ThemeWrapper'; // Nouveau composant pour gérer la classe 'dark'

// export const metadata: Metadata = {
//   title: 'Next.js Todo App',
//   description: 'A comprehensive Todo application built with Next.js',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // suppressHydrationWarning est important pour Tailwind/mode sombre car la classe 'dark' est appliquée côté client
//     <html lang="fr" suppressHydrationWarning>
//       <body>
//         {/* ReduxProvider doit envelopper tout ce qui a besoin d'accéder au store */}
//         <ReduxProvider>
//           {/* ReactQueryProvider gère la logique React Query */}
//           <ReactQueryProvider>
//             {/* ThemeWrapper est un Client Component qui lit l'état Redux et applique la classe 'dark' */}
//             <ThemeWrapper>
//               {children}
//               <ReactQueryDevtoolsWrapper />
//             </ThemeWrapper>
//           </ReactQueryProvider>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }