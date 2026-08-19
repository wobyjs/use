import { isPrimitive } from "woby"

export const wrap = (o: any) => isPrimitive(o) ? (o as any) + '' : JSON.stringify(o)

/**
 * Serializes a value for storage.
 *
 * Always produces JSON so that objects, arrays and primitives all round-trip
 * through {@link unwrap} unchanged. Unlike {@link wrap}, primitives are quoted,
 * which is what keeps `unwrap(serialize(v)) === v` true for strings.
 *
 * @param o - The value to serialize
 * @returns The JSON representation of the value
 */
export const serialize = (o: any) => JSON.stringify(o)

/**
 * Deserializes a value read back from storage.
 *
 * Falls back to the raw string when the stored text is not valid JSON, so
 * values written by older versions of the storage hooks (which stored
 * primitives unquoted via {@link wrap}) are still readable.
 *
 * @param raw - The raw string read from storage
 * @returns The parsed value, or the raw string if it is not valid JSON
 */
export const unwrap = <T,>(raw: string): T => {
    try {
        return JSON.parse(raw) as T
    } catch {
        return raw as unknown as T
    }
}
