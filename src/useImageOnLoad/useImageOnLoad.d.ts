import { CSSProperties, ObservableReadonly } from 'woby';
interface ImageStyle {
    thumbnail: CSSProperties;
    fullSize: CSSProperties;
}
interface ImageOnLoadType {
    handleImageOnLoad: () => void;
    css: ObservableReadonly<ImageStyle>;
}
export declare function useImageOnLoad(): ImageOnLoadType;
export {};
//# sourceMappingURL=useImageOnLoad.d.ts.map