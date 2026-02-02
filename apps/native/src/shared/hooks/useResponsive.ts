import { useState, useEffect, useCallback, useMemo } from 'react';
import { Dimensions, ScaledSize, PixelRatio } from 'react-native';

/**
 * Breakpoint values for responsive design
 */
export enum Breakpoints {
  /** Mobile phones in portrait */
  SMALL = 375,
  /** Mobile phones in landscape / small tablets */
  MEDIUM = 768,
  /** Tablets / small laptops */
  LARGE = 1024,
  /** Large tablets / laptops */
  XLARGE = 1280,
}

/**
 * Responsive values by breakpoint
 */
type ResponsiveValue<T> = {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default?: T;
};

/**
 * Device type detection
 */
interface DeviceInfo {
  /** Device width in points */
  width: number;
  /** Device height in points */
  height: number;
  /** Device scale factor */
  scale: number;
  /** Font scale factor */
  fontScale: number;
  /** Whether device is in portrait orientation */
  isPortrait: boolean;
  /** Whether device is a tablet */
  isTablet: boolean;
  /** Current breakpoint */
  breakpoint: keyof typeof Breakpoints;
}

/**
 * Return type for useResponsive hook
 */
interface UseResponsiveReturn extends DeviceInfo {
  /** Get responsive value based on current breakpoint */
  getResponsiveValue: <T>(values: ResponsiveValue<T>) => T | undefined;
  /** Whether current breakpoint is at least the given size */
  isGte: (breakpoint: keyof typeof Breakpoints) => boolean;
  /** Whether current breakpoint is at most the given size */
  isLte: (breakpoint: keyof typeof Breakpoints) => boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT, scale: SCREEN_SCALE } = Dimensions.get('window');

/**
 * Determines if device is a tablet based on screen dimensions
 */
const isTabletDevice = (): boolean => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  // iPad detection (based on Apple's guidelines)
  if (SCREEN_WIDTH >= 768) return true;
  
  // Android tablet detection
  return Math.min(adjustedWidth, adjustedHeight) >= 600;
};

/**
 * Gets current breakpoint based on width
 */
const getBreakpoint = (width: number): keyof typeof Breakpoints => {
  if (width >= Breakpoints.XLARGE) return 'XLARGE';
  if (width >= Breakpoints.LARGE) return 'LARGE';
  if (width >= Breakpoints.MEDIUM) return 'MEDIUM';
  return 'SMALL';
};

/**
 * Hook for responsive design with breakpoint support
 * Automatically updates on orientation changes and dimension changes
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isTablet, width, getResponsiveValue, isGte } = useResponsive();
 *   
 *   // Responsive styles
 *   const padding = getResponsiveValue({
 *     sm: 16,
 *     md: 24,
 *     lg: 32,
 *     default: 16
 *   });
 *   
 *   // Conditional rendering
 *   if (isGte('MEDIUM')) {
 *     return <TabletLayout />;
 *   }
 *   
 *   return <MobileLayout />;
 * }
 * ```
 */
export function useResponsive(): UseResponsiveReturn {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const deviceInfo: DeviceInfo = useMemo(() => {
    const { width, height, scale, fontScale } = dimensions;
    return {
      width,
      height,
      scale,
      fontScale,
      isPortrait: height > width,
      isTablet: isTabletDevice(),
      breakpoint: getBreakpoint(width),
    };
  }, [dimensions]);

  const getResponsiveValue = useCallback(
    <T, (values: ResponsiveValue<T>): T | undefined => {
      const { breakpoint } = deviceInfo;
      
      switch (breakpoint) {
        case 'XLARGE':
          return values.xl ?? values.lg ?? values.md ?? values.sm ?? values.default;
        case 'LARGE':
          return values.lg ?? values.md ?? values.sm ?? values.default;
        case 'MEDIUM':
          return values.md ?? values.sm ?? values.default;
        case 'SMALL':
        default:
          return values.sm ?? values.default;
      }
    },
    [deviceInfo]
  );

  const isGte = useCallback(
    (breakpoint: keyof typeof Breakpoints): boolean => {
      const breakpoints: (keyof typeof Breakpoints)[] = ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];
      const currentIndex = breakpoints.indexOf(deviceInfo.breakpoint);
      const targetIndex = breakpoints.indexOf(breakpoint);
      return currentIndex >= targetIndex;
    },
    [deviceInfo.breakpoint]
  );

  const isLte = useCallback(
    (breakpoint: keyof typeof Breakpoints): boolean => {
      const breakpoints: (keyof typeof Breakpoints)[] = ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];
      const currentIndex = breakpoints.indexOf(deviceInfo.breakpoint);
      const targetIndex = breakpoints.indexOf(breakpoint);
      return currentIndex <= targetIndex;
    },
    [deviceInfo.breakpoint]
  );

  return useMemo(
    () => ({
      ...deviceInfo,
      getResponsiveValue,
      isGte,
      isLte,
    }),
    [deviceInfo, getResponsiveValue, isGte, isLte]
  );
}

export default useResponsive;
