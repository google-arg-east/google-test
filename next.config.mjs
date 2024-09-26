/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/a87s6d87as6bdas6d87as6d8asbd6a78s6d8a7s6d87as6d87as6d786bas8d6a8sd68a7sd',
                permanent: true, // Marca como redirección permanente (301)
            },
        ];
    },
};

export default nextConfig;
