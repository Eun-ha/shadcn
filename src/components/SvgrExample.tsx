import ReactLogo from '@/assets/react.svg?react'
import ViteLogo from '@/assets/vite.svg?react'

// 패턴 1: React 컴포넌트로 임포트 (?react 쿼리)
// className, style, aria 속성을 직접 전달할 수 있음
function SvgrExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h2 className="text-xl font-semibold">vite-plugin-svgr 예시</h2>

      {/* 기본 사용 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">기본 — SVG를 React 컴포넌트로</h3>
        <div className="flex items-center gap-4">
          <ReactLogo />
          <ViteLogo />
        </div>
      </section>

      {/* className으로 크기 제어 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">className으로 크기·색상 제어</h3>
        <div className="flex items-center gap-4">
          <ReactLogo className="size-8 text-sky-400" />
          <ReactLogo className="size-12 text-sky-500" />
          <ReactLogo className="size-16 text-sky-600" />
        </div>
      </section>

      {/* style prop */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">style prop으로 인라인 스타일</h3>
        <div className="flex items-center gap-4">
          <ViteLogo style={{ width: 32, height: 32 }} />
          <ViteLogo style={{ width: 48, height: 48, filter: 'grayscale(1)' }} />
        </div>
      </section>

      {/* aria 접근성 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">접근성 — aria-label, role</h3>
        <div className="flex items-center gap-4">
          <ReactLogo className="size-10" role="img" aria-label="React 로고" />
          <ViteLogo className="size-10" role="img" aria-label="Vite 로고" />
        </div>
      </section>

      {/* URL 임포트 (기존 방식) 비교 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">비교 — 기존 URL 임포트 (className 적용 안 됨)</h3>
        <div className="flex items-center gap-4">
          {/* URL로 가져오면 단순 img 태그 — SVG 내부 fill 색상 변경 불가 */}
          <img src="/src/assets/react.svg" className="size-10 text-red-500" alt="react" />
        </div>
        <p className="text-xs text-gray-400">
          URL 임포트는 img 태그라 SVG 내부 색상 제어 불가. ?react 쿼리를 쓰면 인라인 SVG처럼 동작.
        </p>
      </section>
    </div>
  )
}

export default SvgrExample
