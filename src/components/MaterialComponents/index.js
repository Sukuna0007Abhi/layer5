import React, { Suspense, lazy } from 'react';

// Form Components
export const TextField = lazy(() => import('@mui/material/TextField'));
export const Select = lazy(() => import('@mui/material/Select'));
export const FormControl = lazy(() => import('@mui/material/FormControl'));
export const InputLabel = lazy(() => import('@mui/material/InputLabel'));
export const MenuItem = lazy(() => import('@mui/material/MenuItem'));

// Layout Components 
export const Box = lazy(() => import('@mui/material/Box'));
export const Container = lazy(() => import('@mui/material/Container'));
export const Grid = lazy(() => import('@mui/material/Grid'));

// Feedback Components
export const Backdrop = lazy(() => import('@mui/material/Backdrop'));
export const Popper = lazy(() => import('@mui/material/Popper'));

export const LazyComponent = ({ component: Component, ...props }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);
