import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/**
 * Custom hook to manage the state and behavior of a dropdown component.
 * @param initialState - Initial state of the dropdown (open or closed).
 * @returns An object containing the dropdown state, a ref, and functions to toggle and close the dropdown.
 */
export const useDropdownState = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const ref = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return useMemo(
    () => ({ isOpen, closeDropdown, toggleDropdown, ref }),
    [isOpen, closeDropdown, toggleDropdown],
  );
};
