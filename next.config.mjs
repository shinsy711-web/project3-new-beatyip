/** @type {import('next').NextConfig} */
const nextConfig = {
  // 설계서 URL이 모두 트레일링 슬래시(/diagnosis/ 등) 기준이므로 그대로 맞춘다.
  trailingSlash: true,
};
export default nextConfig;
