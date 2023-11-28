import localFont from "next/font/local";

export const flexo = localFont({
  src: [
    {
      path: "./Flexo-Regular.woff2",
      weight: '400',
      style: 'normal'
    },
    {
      path: "./Flexo-It.woff2",
      weight: '400',
      style: 'italic'
    },
    {
      path: "./Flexo-Thin.woff2",
      weight: '200',
      style: 'normal'
    },
    {
      path: "./Flexo-ThinIt.woff2",
      weight: '200',
      style: 'italic'
    },
    {
      path: "./Flexo-Medium.woff2",
      weight: '500',
      style: 'normal'
    },
    {
      path: "./Flexo-MediumIt.woff2",
      weight: '500',
      style: 'italic'
    },
    {
      path: "./Flexo-Bold.woff2",
      weight: '700',
      style: 'normal'
    },
    {
      path: "./Flexo-BoldIt.woff2",
      weight: '700',
      style: 'italic'
    },
    {
      path: "./Flexo-Light.woff2",
      weight: '300',
      style: 'normal'
    },
    {
      path: "./Flexo-LightIt.woff2",
      weight: '300',
      style: 'italic'
    },
    {
      path: "./Flexo-Demi.woff2",
      weight: '600',
      style: 'normal'
    },
    {
      path: "./Flexo-DemiIt.woff2",
      weight: '600',
      style: 'italic'
    },
  ],
  display: 'swap',
  variable: '--flexo'

});