import { $$, useMemo } from "woby"
import { useLocation } from "./useLocation"

const l = useLocation()

export const isLocalhost = useMemo(() => $$(l).host.toLowerCase().includes('localhost'))