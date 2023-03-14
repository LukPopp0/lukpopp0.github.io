import { ButtonHTMLAttributes, ReactElement } from 'react';
import './magicButton.scss';

type MagicButtonProps = {
  children: ReactElement | ReactElement[] | string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const MagicButton = (props: MagicButtonProps) => {
  const { children, href, ...buttonProps } = props;

  const child = href ? (
    <a className="magic-button-anchor" target="_blank" href={href} rel="noreferrer">
      {children}
    </a>
  ) : (
    children
  );

  const btn = (
    <button {...buttonProps} className={`magic-button ${buttonProps.className}`}>
      {child}{' '}
    </button>
  );

  return btn;
};
