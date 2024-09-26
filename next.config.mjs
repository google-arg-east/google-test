/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Marca como redirección permanente (301)
            },
        ];
    },
};

export default nextConfig;
