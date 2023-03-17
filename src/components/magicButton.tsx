import { ButtonHTMLAttributes, ReactElement, useLayoutEffect, useRef } from 'react';
import './magicButton.scss';

type MagicButtonProps = {
  children: ReactElement | ReactElement[] | string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const MagicButton = (props: MagicButtonProps) => {
  const { children, href, ...buttonProps } = props;
  const btnRef = useRef<HTMLButtonElement>(null);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const child = href ? (
    <a className="magic-button-anchor" target="_blank" href={href} rel="noreferrer">
      {children}
    </a>
  ) : (
    children
  );

  const btn = (
    <button
      {...buttonProps}
      ref={btnRef}
      className={`magic-button ${buttonProps.className || ''}`}
      tabIndex={href ? -1 : 0}
    >
      <svg className="glow-container">
        {!isSafari && <rect pathLength="100" className="glow-blur"></rect>}
        <rect pathLength="100" className="glow-line"></rect>
      </svg>
      {child}
    </button>
  );

  useLayoutEffect(() => {
    if (!btnRef.current) return;
    const computedStyle = getComputedStyle(btnRef.current);
    btnRef.current.querySelectorAll('rect').forEach(rect => {
      rect.setAttribute('rx', computedStyle.borderRadius);
    });
  }, []);

  return btn;
};
