import { Observable } from 'woby';
type TernaryDarkMode = 'system' | 'dark' | 'light';
interface UseTernaryDarkModeOutput {
    isDarkMode: Observable<boolean>;
    ternaryDarkMode: Observable<TernaryDarkMode>;
    toggleTernaryDarkMode: () => void;
}
export declare function useTernaryDarkMode(): UseTernaryDarkModeOutput;
export {};
//# sourceMappingURL=useTernaryDarkMode.d.ts.map