'use client';

import Lottie, { LottieComponentProps } from 'lottie-react';
import loading from './loading.json';
import moon from './moon.json';
import rocket from './rocket.json';
import sun from './sun.json';

export function RocketLoading(props: Omit<LottieComponentProps, 'animationData'>) {
  return <Lottie {...props} loop animationData={rocket} />
}

export function Loading(props: Omit<LottieComponentProps, 'animationData'>) {
  return <Lottie {...props} loop animationData={loading} />
}

export function Sun(props: Omit<LottieComponentProps, 'animationData'>) {
  return <Lottie {...props} loop animationData={sun} />
}

export function Moon(props: Omit<LottieComponentProps, 'animationData'>) {
  return <Lottie {...props} loop animationData={moon} />
}