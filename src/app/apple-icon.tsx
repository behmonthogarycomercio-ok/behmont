import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111C38',
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 110,
            fontWeight: 800,
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          B
        </span>
      </div>
    ),
    size
  );
}
