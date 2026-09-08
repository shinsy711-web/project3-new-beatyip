/** @type {import('next').NextConfig} */
const nextConfig = {
  // 설계서 URL이 모두 트레일링 슬래시(/diagnosis/ 등) 기준이므로 그대로 맞춘다.
  trailingSlash: true,
  // 구버전 사이트에서 색인된 /major/nail/ 이 현재 코드베이스에는 없어 404가 난다.
  // 이 사이트는 헤어·메이크업·화장품 3개 트랙만 다루므로 가장 가까운 학과 페이지로 영구 이전한다.
  async redirects() {
    return [
      { source: '/major/nail', destination: '/major/makeup/', permanent: true },
    ];
  },
};
export default nextConfig;
